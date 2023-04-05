import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';
import AllChannels from './AllChannels';


const Home = () => {

    const { id } = useParams();
    // const {data: user, error, isPeding} = useFetch('http://localhost:8080/getIdUser/' + id);

    const [user, setUser] = useState( null );
    const [isPeding, setIsPeding] = useState( true );
    const [newChannel, setNewChannel] = useState("");
    const [allChannels, setAllChannels] = useState( null );
    const [channelPending, setChannelPending] = useState( true );


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



      const handleSubmit = (e) => {

        console.log("NEW Channel: ", newChannel);

        e.preventDefault();
        //const channel = {title, body, author};

        //setIsPending('true');

        fetch('http://localhost:8080/addChannel', {
            method: 'POST', 
            body: `newChannel=${newChannel}`,
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(alert("NEW CHANNEL ADDED"));
    }



    const navigate = useNavigate();

    return ( 

        <div className="home">

            {isPeding && <div className='loading'> Loading..... </div>}
            {/* {error && <div> {error} </div>} */}

            <div className='homeUpper'>


            {user && (
                <div className='homeform'>

                    {/* LATER USE IT FOR VAVIGATION BAR */}

                    <div className='navbar'>
                
                    {/* <label> Name: </label> */}
                    <h3 className='navbarHeading'> Hello {user.name} !!! </h3>

                    {/* <label> Id: </label>
                    <h3> {user.id} </h3> */}

                    {/* <label> User Id:  </label>
                    <h3> {user.userId} </h3> */}

                    <div className='navbarButtons'>
                    <Link to = {`/search/${id}`}> <button className='logOut'> Search </button>  </Link>
                    <Link to = "/"> <button className='logOut'> Log out </button>  </Link>
                    </div>

                    </div>

                    
                    <form onSubmit = {handleSubmit} className='newChannelForm'> 

                        <h3 className='channelHeading'> Create a new Channel </h3>
                        <label className='channelLabel'> Channel Name: </label>
                        
                        <input className='channelInput'
                            type="text"
                            required
                            value={newChannel}
                            onChange = { (e) => setNewChannel(e.target.value) }
                        />

                        <button type="submit" className='channelButton'> Create Channel </button>

                    </form>




                    {/* <button onClick={handleClick}> Delete Blog </button> */}
                </div> 
            )}

            </div>


            {user && (
                <AllChannels user={user} className='allChannels'/>
            )}


        </div>
    );


}
 
export default Home;