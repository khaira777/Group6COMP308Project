import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
	type Book {
		title: String
		author: String
	}

	type Query {
		books: [Book]
	}
`;

async function startApolloServer(typeDefs, resolvers) {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		mocks: true,
	});

	await server.start();
	server.applyMiddleware({ app });
	await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs);
