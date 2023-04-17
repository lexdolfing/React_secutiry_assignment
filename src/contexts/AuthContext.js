import React, {createContext, useState} from 'react';
import { useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});



export default function AuthContextProvider({ children }) {
const [isAuthenticated, toggleIsAuthenticated] = useState({
    isAuthenticated: false,
    user: null,
});
    const history = useHistory();
async function logInLogOut(token) {
    console.log(isAuthenticated)
    if (isAuthenticated.isAuthenticated === true) {
        toggleIsAuthenticated({isAuthenticated: false, user: null});
        localStorage.removeItem('token');
        console.log('Gebruiker is uitgelogd!')
        history.push('/');
    } else {
        localStorage.setItem('token', token);
        const tokenDecoded = jwt_decode(token);
        toggleIsAuthenticated({isAuthenticated: true, user: null})
        console.log(tokenDecoded);
        console.log('Gebruiker is ingelogd!')

        //get request to request user details
        try {
            const userDetails = await fetchUserData(token, tokenDecoded, '/profile');
            console.log("gebruikergegevens opvragen is geslaagd!" + userDetails)

            toggleIsAuthenticated({
                isAuthenticated: true,
                user: {
                    username: userDetails.username,
                    email: userDetails.email,
                    id: userDetails.id,
                }
            })
        } catch (e){
            console.error(e)
        }

        history.push('/profile')
    }
}

    async function fetchUserData(token, tokenDecoded, redurectUrl) {
        try{
            const result = await axios.get(`http://localhost:3000/600/users/${tokenDecoded.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            console.log(result);

            return result.data;
        } catch (e) {
            console.error(e + "get request niet gelukt");
            throw e;
        }
    }


    const data = {
        isAuthenticated: isAuthenticated.isAuthenticated,
        logInLogOut: logInLogOut,
        user: isAuthenticated.user,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}