import { gql, makeVar } from '@apollo/client';

// Local Storage Keys
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

// Reactive Variables
export const isLoggedIn = makeVar(!!localStorage.getItem(TOKEN_KEY));
export const currentUser = makeVar(JSON.parse(localStorage.getItem(USER_KEY)));

// Queries
export const USER_QUERY = {
	IS_LOGGED_IN: gql`
		query IsLoggedIn {
			isLoggedIn @client
		}
	`,
	CURRENT_USER: gql`
		query CurrentUser {
			currentUser @client
		}
	`,
};

// Mutations
export const USER_MUTATION = {
	LOGIN: gql`
		mutation Login($email: String!, $password: String!, $type: UserType!) {
			login(email: $email, password: $password, type: $type) {
				_id
				name
				email
				type
				token
			}
		}
	`,
	REGISTER: gql`
		mutation Register(
			$name: String!
			$email: String!
			$password: String!
			$type: UserType!
		) {
			register(name: $name, email: $email, password: $password, type: $type) {
				_id
				name
				email
				type
				token
			}
		}
	`,
};
