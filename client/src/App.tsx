import { Fragment, useState, useEffect } from 'react';
import ShowList from './showList/showlist';
import Login from './login';
import axios from 'axios';

function App() {
	const
		[ authToken, setAuthToken ] = useState<string>(''),
		[ showsList, setShowsList ] = useState<{
			title: string,
			streamingApp: string,
			rating: string,
			review: string
		}[]>([]);
	
	useEffect(() => {
		if (authToken !== '')
			axios.get('http://localhost:3001/shows', {
				headers: {
					authorization: `BEARER ${ authToken }`
				}
			}).then(data => {
				setShowsList(data.data);
			});
	}, [authToken]);

	return (
		<Fragment>
			{
				(authToken === '') ?
					<Login setAuthToken={ setAuthToken } />
					: <ShowList setShowsList={ setShowsList } showsList={ showsList } authToken={ authToken } setAuthToken={ setAuthToken } />
			}
		</Fragment>
	);
}

export default App;
