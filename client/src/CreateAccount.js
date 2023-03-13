
import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';


const CreateAccount = () => {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }


    return ( 

        <div className="login">

            <h1> Create Account :   </h1>

            <div className="create_account">



                <form>

                <label htmlFor="userId">ID: </label>
                <input type="text" id="userId" name="id" value={userId} onChange={handleUserIdChange} />

                <label htmlFor="password">Password: </label>
                <input type="text" id="password" name="password" value={password} onChange={handlePasswordChange} />

                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />

                </form>

                {/* <Link to="/"><button> Submit </button></Link> */}

                <Link to = "/">
                <button 
        
                onClick={(e) => {

                fetch('http://localhost:8080/addUser', {method: 'POST', body: `userId=${userId}&password=${password}&name=${name}`,
                headers: {'Content-type': 'application/x-www-form-urlencoded'}})
                .then(fetch('http://localhost:8080/getPosts')
                .then(response => response.json())
                // .then(response => set(response))
                .then(alert(`User Id: ${userId}, Password: ${password}, Name: ${name}`))
                );

                }}> 

                Submit
        
                </button>
                </Link>



                {/* various links to navigate */}

                {/* <Link to="/"> Home </Link> */}
                {/* <Link to="/addPosts" > Add Posts </Link>
                <Link to="/showPosts" > Show Posts </Link> */}

            </div>
        </div>
    );


}
 
export default CreateAccount;