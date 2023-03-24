
import React, { Component } from 'react';
import Login from './Login';
import { BrowserRouter as Router, Switch, Routes, Route, Link } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Home from './Home';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';


function Channel() {

  const { ChannelName } = useParams();
  const { userId } = useParams();


  const [allMessages, setAllMessages] = useState( null );
  const [messagePending, setMessagePending] = useState( true );
  const [message, setMessage] = useState( null );


  useEffect(() => {
    const fetchChannels = async () => {
      const response = await fetch(`http://localhost:8080/getIdChannel/${ChannelName}`);
      const data = await response.json();
      setAllMessages(data);
      setMessagePending(false);
      console.log("Messages: ", data);
      console.log("Messages IS PENDING: ", messagePending);
    };
    //fetchChannels();

    const intervalId = setInterval(fetchChannels, 1000); // call fetchChannels every 5 seconds

    // cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);


  }, []);


  const addMessage = async (e) => {
    e.preventDefault();
    try {
        const userResponse = await fetch(`http://localhost:8080/getIdUser/${userId}`);
        const userData = await userResponse.json();
        console.log("User Data: ", userData);

        const messageObject = {
            message: message,
            userID: userData.id,
            userName: userData.name,
        };

        const messageResponse = await fetch(`http://localhost:8080/postMessage/${ChannelName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageObject)
        });

        const messageData = await messageResponse.json();
        console.log("Message Data: ", messageData);
        
        setMessage("");
    } catch (error) {
        console.log(error);
    }
};

  

  return (

    <div>

        <h3> Reached Channel with ID: </h3>
        <h3> {ChannelName} </h3>
        <h3> and user ID: </h3>
        <h3> {userId} </h3>

        {messagePending && <div> Loading..... </div>}


        {allMessages && (

          allMessages.map(message => (
              

              <div key = {message.id}>

                
                <h3> {message.userID}</h3>
                <h3> {message.userName}</h3>
                <h3> {message.message} </h3>
                <h3> ........... </h3>

              

              </div>

          ))
      )}


        <div>

        <form onSubmit={addMessage} >


        <label>Type your Message: </label>
        <input 
            type="text"
            required
            value={message}
            onChange = { (e) => setMessage(e.target.value) }
        />
        <button type="submit"> Send </button>
        </form>

        </div>

    </div>

  );

}

export default Channel;
