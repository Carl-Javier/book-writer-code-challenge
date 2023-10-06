import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../services/ContextProvider"
import {useEffect, useState} from "react";
import apiAxiosClient from "../../services/apiAxiosClient";

export default function AuthUsers() {
    const {user, token, role, setUser, setToken, setRole} = useStateContext();
    if (!token) {
        return <Navigate to="/login"/>
    }
    // if (role !== 'Admin') {
    //     return <Navigate to="/books"/>
    // }
    console.log(role);
    switch (role) {
        case 'Author':
            return <Navigate to="/books"/>
        case 'Collaborator':
            return <Navigate to="/collabs"/>
        default:
    }

    const onLogout = ev => {
        ev.preventDefault()

        apiAxiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken('')
            })
    }

    useEffect(() => {
        apiAxiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])

    return (
        <div>
            <nav className="bg-blue-500 p-4 flex justify-between items-center">
                <span className="text-white text-lg font-semibold">{user.name}</span>
                <div className="space-x-4">
                    <button
                        onClick={onLogout}
                        className="text-white hover:text-gray-200"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <Outlet/>
        </div>


    )
}
