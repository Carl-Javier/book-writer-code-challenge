import {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import apiAxiosClient from "../../services/apiAxiosClient";
import {useStateContext} from "../../services/ContextProvider";
import NotFoundPage from "./NotFoundPage";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(() => {
        getBooks();
    }, [])

    const onDeleteClick = book => {
        if (!window.confirm("Are you sure you want to delete this book?")) {
            return
        }
        apiAxiosClient.delete(`/books/${book.id}`)
            .then(() => {
                setNotification('Book was successfully deleted')
                getBooks()
            })
    }

    const getBooks = () => {
        setLoading(true)
        apiAxiosClient.get('/books')
            .then(({data}) => {
                setLoading(false)
                setBooks(data)
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
                        <Link className="btn-add" to="/books/new">Add new</Link>
                    </button>
                    <table className="min-w-full">
                        <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</th>
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
                        {books.map(u => (
                            <tr key={u.id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{u.id}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{u.title}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                    <Link className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline" to={'/books/' + u.id}>Edit</Link>
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
