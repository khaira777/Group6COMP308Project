import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import 'dotenv/config';
import { typeDefs, resolvers } from './graphql';
import connectDB from './database/config';
import { getUserIdFromToken } from './graphql/context/auth-context';

connectDB();

async function startApolloServer(typeDefs, resolvers) {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		context: ({ req }) => {
			const userId = getUserIdFromToken(req);
			return { userId };
		},
	});

	await server.start();
	server.applyMiddleware({ app });
	await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
