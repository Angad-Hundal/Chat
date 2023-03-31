
import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import useFetch from './useFetch';


const Login = () => {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        fetch(`http://localhost:8080/getUser/${userId}/${password}`)
          .then(response => response.json())
          .then(data => {
            if (data) {
              // User found, navigate to home page
              console.log(data);
              var name = data["name"];
              var id = data["id"];
              console.log("Name: " + name);
              console.log("ID: " + id);

              window.location.href = `/home/${id}`;
            } else {
              // User not found or password is incorrect
              setError('Invalid userId or password');
            }
          })
          .catch(error => console.error(error));
      };


    return ( 

        <div className="login">

            <h1> Login :   </h1>

            <div className="links">



                <form onSubmit={handleSubmit}>

                <label htmlFor="userId">ID: </label>
                <input type="text" id="userId" name="id" value={userId} onChange={handleUserIdChange} />

                <label htmlFor="password">Password: </label>
                <input type="text" id="password" name="password" value={password} onChange={handlePasswordChange} />

                {error && <div>{error}</div>}
                <button type="submit">Login</button>

                </form>

                
                <Link to="/createAccount"><button> Create an account </button></Link>

            </div>
        </div>
    );


}
 
export default Login;