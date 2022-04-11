import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, USER_MUTATION } from '../graphql/user';
import useTransformCase from '../hooks/useTransformCase';

const USER_TYPE = {
	PATIENT: 'PATIENT',
	NURSE: 'NURSE',
};

const initialCredential = {
	email: '',
	password: '',
	type: USER_TYPE.PATIENT,
};

function Login() {
	const [credentials, setCredentials] = useState(initialCredential);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const transform = useTransformCase();
	const navigate = useNavigate();
	const [login] = useMutation(USER_MUTATION.LOGIN, {
		onCompleted: (data) => {
			setLoading(false);
			if (data?.login) {
				localStorage.setItem('token', data.login.token);
				isLoggedIn(true);
				navigate('/');
			}
		},
		onError: (err) => {
			setError(err.message);
			setLoading(false);
			isLoggedIn(false);
		},
	});

	const { email, password, type } = credentials;

	const onChange = (e) => {
		setCredentials((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		await login({
			variables: {
				...credentials,
			},
		});
	};

	return (
		<Form className="w-50 mx-auto mt-5 d-grid gap-3" onSubmit={onSubmit}>
			<Form.Group controlId="email">
				<Form.Label>Email</Form.Label>
				<Form.Control
					type="email"
					placeholder="Email"
					value={email}
					name="email"
					onChange={onChange}
				/>
			</Form.Group>

			<Form.Group controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					value={password}
					name="password"
					onChange={onChange}
				/>
			</Form.Group>

			<Form.Group controlId="type">
				<Form.Label>User Type</Form.Label>
				<Form.Select value={type} name="type" onChange={onChange}>
					<option value={USER_TYPE.PATIENT}>
						{transform(USER_TYPE.PATIENT)}
					</option>
					<option value={USER_TYPE.NURSE}>{transform(USER_TYPE.NURSE)}</option>
				</Form.Select>
			</Form.Group>

			{error && (
				<Form.Group>
					<Form.Text className="text-danger">{error}</Form.Text>
				</Form.Group>
			)}

			<Stack direction="horizontal" gap={2}>
				<Button variant="primary" type="submit" disabled={loading}>
					{loading ? (
						<Spinner as="span" size="sm" variant="light" animation="border" />
					) : (
						'Login'
					)}
				</Button>
				<Button variant="outline-secondary" type="reset">
					Clear
				</Button>
			</Stack>
		</Form>
	);
}
export default Login;
