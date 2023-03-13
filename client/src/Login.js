
import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';


const Login = () => {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }


    return ( 

        <div className="login">

            <h1> Login :   </h1>

            <div className="links">



                <form>

                <label htmlFor="userId">ID: </label>
                <input type="text" id="userId" name="id" value={userId} onChange={handleUserIdChange} />

                <label htmlFor="password">Password: </label>
                <input type="text" id="password" name="password" value={password} onChange={handlePasswordChange} />

                </form>

                <button> Submit </button>
                <button> Create New Account </button>

                {/* various links to navigate */}

                {/* <Link to="/"> Home </Link> */}
                {/* <Link to="/addPosts" > Add Posts </Link>
                <Link to="/showPosts" > Show Posts </Link> */}

            </div>
        </div>
    );


}
 
export default Login;