

import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const { id } = useParams();
    // const {data: user, error, isPeding} = useFetch('http://localhost:8080/getIdUser/' + id);

    const [user, setUser] = useState( null );
    const [isPeding, setIsPeding] = useState( true );


    useEffect(() => {
        const fetchUser = async () => {
          const response = await fetch(`http://localhost:8080/getIdUser/${id}`);
          const data = await response.json();
          setUser(data);
          setIsPeding(false);
          console.log("DATA: ", data);
          console.log("IS PENDING: ", isPeding);
        };
        fetchUser();
      }, []);



    const navigate = useNavigate();

    return ( 

        <div className="home">

            <h1> Reached Home page </h1>

            {isPeding && <div> Loading..... </div>}
            {/* {error && <div> {error} </div>} */}
            {user && (
                <div>
                
                    <label> Name: </label>
                    <h3> {user.name} </h3>

                    <label> Id: </label>
                    <h3> {user.id} </h3>

                    <label> User Id:  </label>
                    <h3> {user.userId} </h3>


                    {/* <button onClick={handleClick}> Delete Blog </button> */}
                </div>
                
            )}

        </div>
    );


}
 
export default Home;