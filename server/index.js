import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import 'dotenv/config';
import { typeDefs, resolvers } from './graphql';
import connectDB from './database/config';
import { getUserIdFromToken } from './graphql/context/auth-context';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 4000;

connectDB();

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	app.use(express.static(path.join(__dirname, '../client/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
	);
} else {
	app.get('/', (req, res) => {
		res.status(201).json({ message: 'WELCOME TO SERVER' });
	});
}

async function startApolloServer(typeDefs, resolvers) {
	const app = express();
	app.use(cors());

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
	await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
	console.log(
		`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
	);
}

startApolloServer(typeDefs, resolvers);
