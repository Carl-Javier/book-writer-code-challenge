import {useState} from 'react';
import {Link} from "react-router-dom";
import apiAxiosClient from "../../services/apiAxiosClient";
import {useStateContext} from "../../services/ContextProvider";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setUser, setToken, setRole} = useStateContext()
    const [message, setMessage] = useState(null)

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        // Perform login logic here
        apiAxiosClient.post('/login', {email, password})
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
                setRole(data.role);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message)
                }
            })
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                    {message &&
                    <div className="text-red-500 mb-4">
                        <p>{message}</p>
                    </div>
                    }
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>

                <p className="message px-3 py-2">Not yet registered? <Link to="/signup">Sign Up</Link></p>

                    <button
                        type="button"
                        onClick={handleLogin}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
            </div>
        </div>
    )
}
