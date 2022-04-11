import { gql, makeVar } from '@apollo/client';

export const isLoggedIn = makeVar(localStorage.getItem('token'));

export const USER_QUERY = {
	IS_LOGGED_IN: gql`
		query IsLoggedIn {
			isLoggedIn @client
		}
	`,
};

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
};
