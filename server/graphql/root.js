import { gql } from 'apollo-server-express';

export const Root = gql`
	type Query {
		users: [User]
	}

	type Mutation {
		createUser(
			name: String!
			email: String!
			password: String!
			type: String!
		): User
	}
`;

export const rootResolvers = {
	Query: {
		users: () => users,
	},
};
