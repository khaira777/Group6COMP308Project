import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { currentUser, isLoggedIn } from './graphql/user';

const uri =
	process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4000/graphql';

const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
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
