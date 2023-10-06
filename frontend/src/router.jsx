import {createBrowserRouter} from "react-router-dom";
import Login from "./components/pages/Login";
import Users from "./components/pages/Users";
import UserForm from "./components/pages/UserForm";
import BookForm from "./components/pages/BookForm";
import Signup from "./components/pages/Signup";
import NotFoundPage from "./components/pages/NotFoundPage";
import Home from "./components/pages/Home";
import AuthUsers from "./components/layout/AuthUsers";
import GuestUsers from "./components/layout/GuestUsers";
import {Navigate} from "react-router-dom"
import Books from "./components/pages/Books";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthUsers />,
        children: [
            {
                path: "/",
                element: <Navigate to={"/users"} />
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/books',
                element: <Books/>
            },
            {
                path: '/books/new',
                element: <BookForm key="bookCreate" />
            },
            {
                path: '/books/:id',
                element: <BookForm key="bookUpdate" />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            }
        ]
    },
    {
        path: "/",
        element: <GuestUsers />,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            }
        ]
    },

    {
        path: "*",
        element: <NotFoundPage/>
    }
]);

export default router;
