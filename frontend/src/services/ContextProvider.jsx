import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    role: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setRole: () => {},
    setNotification: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [role, _setRole] = useState('');
    const [notification, _setNotification] = useState('');

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setNotification = message => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }
    const setRole = role => {
        _setRole(role);

        setTimeout(() => {
            _setRole('')
        }, 5000)
    }

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            role,
            setToken,
            setRole,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);
