import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';



const AllChannels = ({user}) => {


    const [allChannels, setAllChannels] = useState( null );
    const [channelPending, setChannelPending] = useState( true );


      useEffect(() => {
        const fetchChannels = async () => {
          const response = await fetch(`http://localhost:8080/getChannels`);
          const data = await response.json();
          setAllChannels(data);
          setChannelPending(false);
          console.log("CHANNELS: ", data);
          console.log("CHANNEL IS PENDING: ", channelPending);
        };
        fetchChannels();
      }, []);




    const navigate = useNavigate();

    return ( 

        <div className="home">

            <h1> All Channels:  </h1>

            {user && (
                <div>

                    {/* USE IT FOR VAVIGATION BAR */}
                

                    {channelPending && <div> Loading..... </div>}

                    {allChannels && (

                        allChannels.map(channel => (
                            
                            <h3> {channel.name} </h3>
                        ))
                    )}
                    
                    



                </div>
                
            )}

        </div>
    );


}
 
export default AllChannels;