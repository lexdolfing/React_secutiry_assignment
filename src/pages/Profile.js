import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../contexts/AuthContext";
import axios from "axios";

function Profile() {
    const mijnContext = useContext(AuthContext);
    console.log(mijnContext)
    console.log("hierboven de context");
    const token = localStorage.getItem('token');
    const [secretData, setSecretData] = useState('');

    useEffect(() => {

        async function getPrivateContent() {
            try{
            const response = await axios.get(`http://localhost:3000/660/private-content`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(response)
                setSecretData(response.data);

        } catch (e){
                console.error(e)
            }
        }

        void getPrivateContent()
            console.log("hieronder de token")
            console.log(token)

        },


        [])

  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong>  {mijnContext.user.username} </p>
        <p><strong>Email:</strong> {mijnContext.user.email}</p>
      </section>
      <section>
        <h2>{secretData.title}</h2>
        <p>{secretData.content}</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;