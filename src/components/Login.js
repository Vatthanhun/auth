import React, {useState} from 'react';
import auth from '../firebase';


const Login = ({setSession}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await auth.signInWithEmailAndPassword(username, password);
            const {user} = response;
    
            setSession({
                isLoggedIn: true,
                currentUser: user
            })
        } catch (error) {
            setSession({
                isLoggedIn: false,
                currentUser: null,
                errorMessage: error.Message
            })
        }
    }

    const handleRegister = async () => {
        try {
            const response = await auth.createUserWithEmailAndPassword(username, password);
            const {user} = response;
    
            setSession({
                isLoggedIn: true,
                currentUser: user
            })
        } catch (error) {
            setSession({
                isLoggedIn: false,
                currentUser: null,
                errorMessage: error.Message
            })
        }
    }

    const handleUsername = event => {
       setUsername(event.target.value)
    }

    return (
        <div>
            <input type="email" placeholder="Email" onChange={handleUsername} />
            <input type="password" placeholder="Password" onChange={event => {
                setPassword(event.target.value)
            }} />
            <button type="button" onClick={handleLogin}>Login</button>
            <button type="button" onClick={handleRegister}>Register</button>
        </div>
    )
}

export default Login;