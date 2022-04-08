import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function App() {
	const { data } = useQuery(gql`
		{
			books {
				id
				title
				author
			}
		}
	`);

	useEffect(() => {
		if (data) console.log(data);
	}, [data]);

	return (
		<div>
			<Button>Hello</Button>
		</div>
	);
}

export default App;
