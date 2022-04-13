import { gql } from 'apollo-server-express';
import DailyTipModel from '../database/model/daily-tip';
import UserModel from '../database/model/user';

export const DailyTip = gql`
	type Query {
		dailyTips: [DailyTip]
	}

	type Mutation {
		addDailyTip(content: String!): DailyTip
	}

	type DailyTip {
		_id: ID!
		user: User!
		content: String!
		createdAt: String!
	}
`;

export const dailyTipResolvers = {
	Query: {
		dailyTips: async (parent, args, ctx, info) => {
			if (!ctx.userId) {
				throw new Error('You must be logged in to view daily tips.');
			}

			const user = await UserModel.findById(ctx.userId);
			const dailyTips = await DailyTipModel.find()
				.sort({ createdAt: 'desc' })
				.limit(10);
			return dailyTips.map((dailyTip) => {
				return { ...dailyTip._doc, user };
			});
		},
	},
	Mutation: {
		addDailyTip: async (parent, args, ctx, info) => {
			const { userId } = ctx;
			const { content } = args;

			if (!userId) {
				throw new Error('You must be logged in to add a daily tip');
			}

			const dailyTip = new DailyTipModel({ content, user: userId });
			return await dailyTip.save();
		},
	},
};
