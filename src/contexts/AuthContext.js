import React, {createContext, useState} from 'react';
import { useHistory} from "react-router-dom";

export const AuthContext = createContext({});



export default function AuthContextProvider({ children }) {
const [isAuthenticated, toggleIsAuthenticated] = useState(false);
    const history = useHistory();
function logInLogOut() {

    if (isAuthenticated) {
        toggleIsAuthenticated(false)
        console.log('Gebruiker is uitgelogd!')
        history.push('/');
    } else {
        toggleIsAuthenticated(true)
        console.log('Gebruiker is ingelogd!')
        history.push('/profile')
    }
}
    const data = {
        isAuthenticated: isAuthenticated,
        toggleIsAuthenticated: toggleIsAuthenticated,
        logInLogOut: logInLogOut,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}