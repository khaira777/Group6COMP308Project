import { Tip, tipResolvers } from './tip';
import { User, userResolvers } from './user';

export const typeDefs = [User, Tip];
export const resolvers = [userResolvers, tipResolvers];
