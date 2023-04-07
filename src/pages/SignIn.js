import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../contexts/AuthContext";

function SignIn() {
    const {logInLogOut} = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("ja hallo hier de login knop")
        logInLogOut();
    }
  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit}>
        <p>*invoervelden*</p>
        <button type="submit">Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;