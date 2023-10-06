import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import apiAxiosClient from "../../services/apiAxiosClient";
import {useStateContext} from "../../services/ContextProvider";

export default function Signup() {
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        apiAxiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.message)
                }
            })
    }

    return (
        // <div className="login-signup-form animated fadeInDown">
        //     <div className="form">
        //         <form onSubmit={onSubmit}>
        //             <h1 className="title">Signup for Free</h1>
        //             {errors &&
        //             <div className="alert">
        //                 {Object.keys(errors).map(key => (
        //                     <p key={key}>{errors[key][0]}</p>
        //                 ))}
        //             </div>
        //             }
        //             <input ref={nameRef} type="text" placeholder="Full Name"/>
        //             <input ref={emailRef} type="email" placeholder="Email Address"/>
        //             <input ref={passwordRef} type="password" placeholder="Password"/>
        //             <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
        //             <button className="btn btn-block">Signup</button>
        //             <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        //         </form>
        //     </div>
        // </div>
        <div className="min-h-screen flex justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form onSubmit={onSubmit}>
                    {errors &&
                    <div className="text-red-500 mb-4">
                        <p>{errors}</p>
                    </div>
                    }
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-600">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            ref={nameRef}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            ref={emailRef}
                            id="email"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordRef}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="repeatPassword" className="block text-gray-600">Repeat Password</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            ref={passwordConfirmationRef}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Repeat your password"
                            required
                        />
                    </div>

                    <p className="message px-3 py-2">Already registered? <Link to="/login">Login</Link></p>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}
