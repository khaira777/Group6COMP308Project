import { gql } from 'apollo-server-express';

export const User = gql`
	type User {
		id: ID!
		name: String!
		email: String!
		type: UserType!
	}

	enum UserType {
		NURSE
		PATIENT
	}
`;

export const userResolvers = {};
