import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiAxiosClient from "../../services/apiAxiosClient";
import {useStateContext} from "../../services/ContextProvider";
import SectionForm from './SectionForm';

export default function BookForm() {
    const navigate = useNavigate();
    let {id} = useParams();
    const [book, setBook] = useState({
        id: null,
        title: '',
        collaborator: '',
    })
    const [sections, setSections] = useState([]);

    const handleAddSection = () => {
        setSections([...sections, {}]); // Add a new section object to the sections array
    };
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedRole, setSelectedRole] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const {setNotification} = useStateContext()

    if (id) {
        useEffect(() => {
            setLoading(true)
            apiAxiosClient.get(`/books/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    setBook(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    useEffect(() => {
        // Fetch roles from the API
        apiAxiosClient.get('/collaborators')
            .then(({data}) => {
                console.log(data.collaborators);
                setCollaborators(data.collaborators);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const onSubmit = ev => {
        ev.preventDefault()

        if (book.id) {
            apiAxiosClient.put(`/books/${book.id}`, book)
                .then(() => {
                    setNotification('Books was successfully updated')
                    navigate('/books')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            apiAxiosClient.post('/books', book)
                .then(() => {
                    setNotification('Book was successfully created')
                    navigate('/books')
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
            {book.id && <h1>Update User: {book.title}</h1>}
            {!book.id && <h1>New Book</h1>}
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
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            value={book.title}
                            onChange={ev => setBook({...book, title: ev.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label>Select Collaborators:</label>
                        <select onChange={(e) => setBook({...book, collaborator: e.target.value})}>
                            <option value="">Select a role</option>
                            {collaborators.map((collaborators) => (
                                <option key={collaborators.id} value={collaborators.id}>{collaborators.name}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        className="text-indigo-600 hover:text-gray-200"
                        type="button"
                        onClick={handleAddSection}
                    >
                       Add Section
                    </button>
                    <div>
                        {sections.map((section, index) => (
                            <SectionForm key={index} />
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-6">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Create Book
                        </button>
                    </div>
                </form>
                )}
            </div>
        </>
    )
}
