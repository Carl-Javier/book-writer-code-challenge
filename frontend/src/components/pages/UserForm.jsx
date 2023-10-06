import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiAxiosClient from "../../services/apiAxiosClient";
import {useStateContext} from "../../services/ContextProvider";

export default function UserForm() {
    const navigate = useNavigate();
    let {id} = useParams();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedRole, setSelectedRole] = useState([]);
    const [roles, setRoles] = useState([]);
    const {setNotification} = useStateContext()

    if (id) {
        useEffect(() => {
            setLoading(true)
            apiAxiosClient.get(`/users/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    useEffect(() => {
        // Fetch roles from the API
        apiAxiosClient.get('/roles')
            .then(({data}) => {
                console.log(data.roles);
                setRoles(data.roles);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const onSubmit = ev => {
        ev.preventDefault()

        if (user.id) {
            apiAxiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification('User was successfully updated')
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            apiAxiosClient.post('/users', user)
                .then(() => {
                    setNotification('User was successfully created')
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div >
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
                }
            </div>

            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {!loading && (
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={user.name}
                            onChange={ev => setUser({...user, name: ev.target.value})}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={ev => setUser({...user, email: ev.target.value})}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            onChange={ev => setUser({...user, password: ev.target.value})}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password Confirm
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            onChange={ev => setUser({...user, password_confirmation: ev.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label>Select Roles:</label>
                        <select onChange={(e) => setUser({...user, role: e.target.value})}>
                            <option value="">Select a role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.name}>{role.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Create User
                        </button>
                    </div>
                </form>
                )}
            </div>
        </>
    )
}
