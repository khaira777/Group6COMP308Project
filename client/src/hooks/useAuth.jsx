import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { isLoggedIn, USER_MUTATION, USER_QUERY } from '../graphql/user';

const TOKEN_KEY = 'token';

function useAuth() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [isAuth, setIsAuth] = useState(false);
	const { data } = useQuery(USER_QUERY.IS_LOGGED_IN);
	const [loginMutation] = useMutation(USER_MUTATION.LOGIN, {
		onCompleted: (data) => {
			setLoading(false);
			if (data?.login) {
				localStorage.setItem(TOKEN_KEY, data.login.token);
				isLoggedIn(true);
			}
		},
		onError: (err) => {
			setError(err.message);
			setLoading(false);
			isLoggedIn(false);
		},
	});

	const [registerMutation] = useMutation(USER_MUTATION.REGISTER, {
		onCompleted: (data) => {
			setLoading(false);
			if (data?.register) {
				localStorage.setItem(TOKEN_KEY, data.register.token);
				isLoggedIn(true);
			}
		},
		onError: (err) => {
			setError(err.message);
			setLoading(false);
			isLoggedIn(false);
		},
	});

	useEffect(() => {
		data?.isLoggedIn ? setIsAuth(true) : setIsAuth(false);
	}, [data?.isLoggedIn]);

	const login = async (credentials) => {
		setLoading(true);

		await loginMutation({
			variables: {
				...credentials,
			},
		});
	};

	const register = async (credentials) => {
		setLoading(true);

		await registerMutation({
			variables: {
				...credentials,
			},
		});
	};

	const logout = () => {
		localStorage.removeItem(TOKEN_KEY);
		isLoggedIn(false);
	};

	return { login, register, logout, loading, error, isAuth };
}

export default useAuth;
