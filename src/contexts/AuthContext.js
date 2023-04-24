import React, {createContext, useEffect, useState} from 'react';
import { useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});



export default function AuthContextProvider({ children }) {
const [isAuthenticated, toggleIsAuthenticated] = useState({
    isAuthenticated: false,
    user: null,
    status: 'pending',
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
            const userDetails = await fetchUserData(token, tokenDecoded);
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

    async function fetchUserData(token, tokenDecoded) {
        try{
            const result = await axios.get(`http://localhost:3000/600/users/${tokenDecoded.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            console.log(result.data);

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

useEffect(async () => {
        // context wordt gerefresht
        // log de context in console wanneer de applicatie ververst
        // Met de volgende stappen:

        // 1. Check of er een JWT token in de local storage aanwezig is
        const token = localStorage.getItem('token');
        if (token) {
            // 2. Zo ja, decodeer de token, we hebben het id nodig
            const decodedToken = jwt_decode(token);
            // 3. gebruik de id en token om een get-request te doen naar het gebruikersgegevens end-point (gebruik eerdere functie?)
            try {
                const userDetails = await fetchUserData(token, decodedToken);
                console.log(userDetails);
                console.log("de token is nu dus aanwezig")

                // 4. Gebruik de response om de user gegevens in de context-state te plaatsen (+ isAuth = true en status done)
                toggleIsAuthenticated({
                    isAuthenticated: true,
                    user: {
                        username: userDetails.username,
                        email: userDetails.email,
                        id: userDetails.id,
                    },
                    status: 'done',
                })
            } catch (e) {
                console.error(e);
                userNotFound();
            }
            // 5. Als er geen token aanwezig is, of als het ophalen niet lukt, zet user op null isAuth op false en status op done (handig om aparte functie aan te roepen?)
        } else {
            userNotFound();
        }
        console.log("De context is gerefresht")
        console.log(AuthContext)
    },

    []);

    function userNotFound() {
        toggleIsAuthenticated({
            isAuthenticated: false,
            user: null,
            status: 'done',
        })
    }

    return (
        <AuthContext.Provider value={data}>
            {isAuthenticated.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}