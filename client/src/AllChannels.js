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
        //fetchChannels();

        const intervalId = setInterval(fetchChannels, 1000); // call fetchChannels every 5 seconds

    // cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, []);

    
      const deleteChannel = async (channelName) => {
        try {
            const response = await fetch(`http://localhost:8080/deleteChannel/${channelName}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const data = await response.json();
                console.log(`Deleted channel ${data.name}`);
                //setAllChannels(allChannels.filter(channel => channel.id !== channelId));
            } else {
                console.log(`Failed to delete channel ${channelName}`);
            }
        } catch (error) {
            console.error(`Failed to delete channel ${channelName}:`, error);
        }
    };



    const navigate = useNavigate();

    return ( 

        <div className="allChannels">

            <h1 className='allChannelsHeading'> All Channels:  </h1>

            {user && (
                <div className='allChannelsForm' >

                    {/* USE IT FOR VAVIGATION BAR */}
                

                    {channelPending && <div className='loading'> Loading..... </div>}

                    {/* <Link to={`/search/${user.id}`}>
                        <button className='search'> SEARCH </button>
                    </Link> */}

                    {allChannels && (

                        allChannels.map(channel => (
                            

                                
                            <div key = {channel.id} className='channelName'>

                            <Link to={`/channels/${channel.name}/${user.id}`}>
                                <h3 className='channelHeading2' > {channel.name} </h3>
                            </Link>

                            {user.id === 1 && (
                                <button onClick={ () => deleteChannel(channel.name)} className='deleteChannel'> DELETE CHANNEL </button>
                            )}

                            

                            </div>

                        ))
                    )}
                    
                    



                </div>
                
            )}

        </div>
    );


}
 
export default AllChannels;