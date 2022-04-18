import DailyInfoModel from '../database/model/daily-info.js';
import { gql } from 'apollo-server-core';

export const DailyInfo = gql`
	type Query {
		dailyInfo: [DailyInfo]
	}

	type Mutation {
		addDailyInfo(dailyInfo: DailyInfoInput!): DailyInfo
		updateDailyInfo(_id: ID!, dailyInfo: DailyInfoInput!): DailyInfo
		deleteDailyInfo(_id: ID!): ID
	}

	type DailyInfo {
		_id: ID!
		patient: User!
		pulseRate: Int!
		bloodPressure: Int!
		weight: Float!
		bodyTemperature: Float!
		respiratoryRate: Int!
		date: String!
	}

	input DailyInfoInput {
		pulseRate: Int!
		bloodPressure: Int!
		weight: Float!
		bodyTemperature: Float!
		respiratoryRate: Int!
		date: String!
	}
`;

export const dailyInfoResolvers = {
	Query: {
		dailyInfo: async (parent, args, { userId }, info) => {
			return await DailyInfoModel.find({ patient: userId });
		},
	},
	Mutation: {
		addDailyInfo: async (_, { dailyInfo }) => {
			const newDailyInfo = new DailyInfoModel(dailyInfo);
			return await newDailyInfo.save();
		},
		updateDailyInfo: async (parent, { _id, dailyInfo }, { userId }) => {
			return await DailyInfoModel.findOneAndUpdate({ _id }, dailyInfo, {
				new: true,
			});
		},
		deleteDailyInfo: async (_, { _id }) => {
			await DailyInfoModel.findOneAndDelete({ _id });
			return _id;
		},
	},
};
