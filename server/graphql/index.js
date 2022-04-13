import { Alert, alertResolvers } from './alert';
import { DailyTip, dailyTipResolvers } from './daily-tip';
import { User, userResolvers } from './user';

export const typeDefs = [User, DailyTip, Alert];
export const resolvers = [userResolvers, dailyTipResolvers, alertResolvers];
