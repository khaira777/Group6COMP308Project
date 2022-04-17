import { gql } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../database/model/user.js';

// TODO: May not need verifyToken query
export const User = gql`
	type Query {
		getPatients: [User]
	}

	type Mutation {
		login(email: String!, password: String!, type: UserType!): User
		register(
			name: String!
			email: String!
			password: String!
			type: UserType!
		): User
	}

	type User {
		_id: ID!
		name: String!
		email: String!
		type: UserType!
		token: String!
	}

	enum UserType {
		NURSE
		PATIENT
	}
`;

export const userResolvers = {
	Query: {
		getPatients: async (parent, args, ctx, info) => {
			if (!ctx.userId) {
				throw new Error('You must be logged in');
			}
			const user = await UserModel.findOne({ _id: ctx.userId, type: 'NURSE' });
			if (!user) {
				throw new Error('You must be a nurse to view patient info');
			}
			return await UserModel.find({ type: 'PATIENT' });
		},
	},
	Mutation: {
		login: async (parent, args, ctx, info) => {
			const { email, password, type } = args;
			const ERROR = new Error('Invalid Credentials / User Does Not Exist');

			try {
				const userData = await UserModel.findOne({ email, type }, null, {
					lean: true,
				});

				if (!userData) {
					throw ERROR;
				}

				if (!bcrypt.compare(password, userData.password)) {
					throw ERROR;
				}

				return { ...userData, token: generateToken(userData._id) };
			} catch (error) {
				throw new Error(error.toString());
			}
		},
		register: async (parent, args, ctx, info) => {
			const { password } = args;
			const EMAIL_ERROR = new Error('Email is already being used');

			try {
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				const userData = await UserModel.create({
					...args,
					password: hashedPassword,
				});

				return { ...userData.toObject(), token: generateToken(userData._id) };
			} catch (error) {
				if (error.code === 11000) {
					throw EMAIL_ERROR;
				}

				throw new Error(error.toString());
			}
		},
	},
};

const generateToken = (_id) => {
	const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	return token;
};
