import React from 'react';
import { Link , useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";

function SignUp() {
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm();

    function handleFormSubmit(data){
        console.log(data);
        createUser(data);
    }

    async function createUser(data) {
        try {
            const result = await axios.post('http://localhost:3000/register',{
                email: data.email,
                password: data.password,
                username: data.username,
            })
            console.log(result);
            if (result.data.accessToken != null){
               history.push('/signin')
            };


        } catch(e){
            console.error(e);
        }
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
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
          <label htmlFor="usernamefield"> Username
              <input type="text" id="usernamefield" {...register("username")}/>
          </label>

          <button type="submit">Registreren</button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;