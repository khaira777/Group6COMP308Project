import { gql } from 'apollo-server-express';

export const Tip = gql`
	type Tip {
		id: ID!
		content: String!
		createdAt: String!
	}
`;

export const tipResolvers = {};
