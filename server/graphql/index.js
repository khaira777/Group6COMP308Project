import { Root, rootResolvers } from './root';
import { User, userResolvers } from './user';
import { Tip, tipResolvers } from './tip';

export const typeDefs = [Root, User, Tip];
export const resolvers = [rootResolvers, userResolvers, tipResolvers];
