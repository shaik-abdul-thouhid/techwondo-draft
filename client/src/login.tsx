import { Fragment, useRef, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export default function Login(props: {
    setAuthToken: React.Dispatch<React.SetStateAction<string>>
}) {
    const
        username = useRef<string>(''),
        password = useRef<string>(''),
        [message, setMessage] = useState<string>(''),
        getAuthToken = () => {
            if (username.current !== '' && password.current !== '') {
                axios.get('http://localhost:3001/login', {
                    params : {
                        username: username.current,
                        password: password.current
                    }
                }).then((data: AxiosResponse) => {
                    if (data.status === 201)
                        props.setAuthToken(data.data.accessToken);
                }).catch(err => setMessage(err.response.data));
            }
        }

    return (
        <Fragment>
            Login<br />
            <input type='text' onChange={ e => username.current = e.target.value } placeholder='username' /><br />
            <input type='password' onChange={ e => password.current = e.target.value } placeholder='password' /><br/>
            <button onClick={ () => getAuthToken() }>Submit</button>
            <p>{ message }</p>
        </Fragment>
    );
}