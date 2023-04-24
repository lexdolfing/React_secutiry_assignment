import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../contexts/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";

function SignIn() {
    const {logInLogOut} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function handleFormSubmit(data) {
        console.log("ja hallo hier de login knop")
        console.log(data);
        try {
            const token = await login(data);
            console.log(token);
            logInLogOut(token);
        } catch (e) {
            console.error(e)
        }
    }

    async function login(data) {
        try {
            const result = await axios.post ('http://localhost:3000/login', {
                email: data.email,
                password: data.password,
            })
            console.log(result.data.accessToken)
            return result.data.accessToken;
        } catch(e){
            console.error(e);
        }

    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <label htmlFor="emailField"> E-mail
                    <input type="text" id="emailField"
                           {...register("email", {
                                   required: {value: true, message: 'dit veld is verplicht'},
                                   validate: (value) => value.includes('@') || 'voer een geldig e-mailadres in',
                               }
                           )}
                           placeholder='e-mailadres'/>
                    {errors.email && <p>{errors.email.message}</p>}
                </label>
                <label htmlFor="password"> Password
                    <input type="password" id="passwordfield"
                           {...register("password", {
                               required: true,
                               validate: (value) => value.length > 10 || 'wachtwoord moet minimaal 10 tekens bevatten',
                               }
                           )} placeholder="**********"/>
                    {errors.password && <p>{errors.password.message}</p>}
                </label>

                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;