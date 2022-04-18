import { Alert, alertResolvers } from './alert.js';
import { DailyInfo, dailyInfoResolvers } from './daily-info.js';
import { DailyTip, dailyTipResolvers } from './daily-tip.js';
import { User, userResolvers } from './user.js';
import { VitalSign, vitalSignResolvers } from './vital-sign.js';

export const typeDefs = [User, DailyTip, Alert, VitalSign, DailyInfo];
export const resolvers = [
	userResolvers,
	dailyTipResolvers,
	alertResolvers,
	vitalSignResolvers,
	dailyInfoResolvers,
];
