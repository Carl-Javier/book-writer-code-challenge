import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import apiAxiosClient from "../../services/apiAxiosClient";
import {useStateContext} from "../../services/ContextProvider";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(() => {
        getUsers();
    }, [])

    const onDeleteClick = user => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return
        }
        apiAxiosClient.delete(`/users/${user.id}`)
            .then(() => {
                setNotification('User was successfully deleted')
                getUsers()
            })
    }

    const getUsers = () => {
        setLoading(true)
        apiAxiosClient.get('/users')
            .then(({data}) => {
                setLoading(false)
                setUsers(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            <div className="min-h-screen flex justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    >
                        <Link className="btn-add" to="/users/new">Add new</Link>
                    </button>
                    <table className="min-w-full">
                        <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">Created
                                Date
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                        </tr>
                        </thead>
                        {loading &&
                        <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                        </tbody>
                        }
                        {!loading &&
                        <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{u.id}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{u.name}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{u.email}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{u.created_at}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                    <Link className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline" to={'/users/' + u.id}>Edit</Link>
                                    &nbsp;
                                    <button className="text-red-500 hover:text-red-500 focus:outline-none focus:underline" onClick={ev => onDeleteClick(u)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}
