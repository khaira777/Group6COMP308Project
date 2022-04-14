import { Alert, alertResolvers } from './alert.js';
import { DailyTip, dailyTipResolvers } from './daily-tip.js';
import { User, userResolvers } from './user.js';

export const typeDefs = [User, DailyTip, Alert];
export const resolvers = [userResolvers, dailyTipResolvers, alertResolvers];
