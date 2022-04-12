import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { currentUser, isLoggedIn } from './graphql/user';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					isLoggedIn: {
						read() {
							return isLoggedIn();
						},
					},
					currentUser: {
						read() {
							return currentUser();
						},
					},
				},
			},
		},
	}),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
