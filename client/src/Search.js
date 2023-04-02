import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';



const Search = () => {

    const { userId } = useParams();


    const [allChannels, setAllChannels] = useState( null );
    const [channelPending, setChannelPending] = useState( true );
    const [user, setUser] = useState( null );
    const [UserIsPeding, setUserIsPeding] = useState( true );



    useEffect(() => {
        const fetchUser = async () => {
          const response = await fetch(`http://localhost:8080/getIdUser/${userId}`);
          const data = await response.json();
          setUser(data);
          setUserIsPeding(false);
          console.log("DATA: ", data);
          console.log("IS PENDING: ", UserIsPeding);
        };
        fetchUser();
      }, []);




      useEffect(() => {
        const fetchChannels = async () => {
          const response = await fetch(`http://localhost:8080/getChannels`);
          const data = await response.json();
          setAllChannels(data);
          setChannelPending(false);
          console.log("CHANNELS: ", data);
          console.log("CHANNEL IS PENDING: ", channelPending);
        };
        //fetchChannels();

        const intervalId = setInterval(fetchChannels, 1000); // call fetchChannels every 5 seconds

    // cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, []);








    const navigate = useNavigate();

    return ( 

        <div className="home">

            <h3> Search Reached </h3>


            {user && (
                <div>

                    {/* LATER USE IT FOR VAVIGATION BAR */}
                
                    <label> Name: </label>
                    <h3> {user.name} </h3>

                    <label> Id: </label>
                    <h3> {user.id} </h3>

                    <label> User Id:  </label>
                    <h3> {user.userId} </h3>

                    <Link to = "/"> <button> Log out </button>  </Link>

            
                </div> 
            )}

        </div>
    );


}
 
export default Search;