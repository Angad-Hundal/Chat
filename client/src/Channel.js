
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
  const [allReplies, setAllReplies] = useState( null );
  const [repliesPending, setRepliesPending] = useState( true );

  const [reply, setReply] = useState( null );
  const [replyParentId, setReplyParentId] = useState( null );
 

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




  useEffect(() => {
    const fetchReplies = async () => {
      const response = await fetch(`http://localhost:8080/getAllReplies/${ChannelName}`);
      const data = await response.json();
      setAllReplies(data);
      setRepliesPending(false);
      console.log("Replies: ", allReplies);
      console.log("Replies IS PENDING: ", repliesPending);
    };
    //fetchReplies();

    const intervalId_replies = setInterval(fetchReplies, 1000); // call fetchChannels every 5 seconds

    // cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId_replies);


  }, []);




  const VoteUp = async (messageId) => {
    try {
      // Make a POST request to the server to increment the message's upvote count
      const response = await fetch(`http://localhost:8080/voteUp/${ChannelName}/${messageId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // If the request is successful, update the message's upvote count
      if (response.ok) {

        console.log("UPVOTED SUCCESSFULLY");
      }
    } 
    catch (error) {
      console.log(error);
    }
  };




  const VoteDown = async (messageId) => {
    try {
      // Make a POST request to the server to increment the message's upvote count
      const response = await fetch(`http://localhost:8080/voteDown/${ChannelName}/${messageId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // If the request is successful, update the message's upvote count
      if (response.ok) {
        console.log("UPVOTED SUCCESSFULLY");
      }
    } 
    catch (error) {
      console.log(error);
    }
  };


  
  const deleteReply = async (messageID) => {
    try {
        const response = await fetch(`http://localhost:8080/deleteReply/${messageID}/${ChannelName}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const data = await response.json();
            console.log(`Deleted REPLY}`);
            //setAllChannels(allChannels.filter(channel => channel.id !== channelId));
        } else {
            console.log(`Failed to delete Reply`);
        }
    } catch (error) {
        console.error(`Failed to delete reply:`, error);
    }
};



const deleteMessage = async (messageID) => {
  try {
      const response = await fetch(`http://localhost:8080/deleteMessage/${messageID}/${ChannelName}`, {
          method: 'DELETE',
      });
      if (response.ok) {
          const data = await response.json();
          console.log(`Deleted REPLY}`);
          //setAllChannels(allChannels.filter(channel => channel.id !== channelId));
      } else {
          console.log(`Failed to delete Reply`);
      }
  } catch (error) {
      console.error(`Failed to delete reply:`, error);
  }
};



  

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


    const addReply = async (e, messageId) => {

      e.preventDefault();
      try {
        const userResponse = await fetch(`http://localhost:8080/getIdUser/${userId}`);
        const userData = await userResponse.json();
        console.log("User Data: ", userData);

        const replyObject = {
          //reply: replies[messageId],
          parentID: replyParentId,
          userID: userData.id,
          userName: userData.name,
          replyMessage: reply
        };

        const replyResponse = await fetch(`http://localhost:8080/postReply/${ChannelName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(replyObject)
        });

        const replyData = await replyResponse.json();
        console.log("Reply Posted: ", reply);

        //setReplies({...replies, [messageId]: ""});
      } catch (error) {
        console.log(error);
      }
    };

  

  return (

    <div className='messageForm'>

      <div className='navbar'>

        {/* <h3> Reached Channel with ID: </h3> */}

        <h3 className='navbarHeading'> Welcome to {ChannelName} !!! </h3>

        <div className='navbarButtons'>

        <Link to = {`/home/${userId}`}> <button className='logOut'> Home </button>  </Link>
        <Link to = {`/search/${userId}`}> <button className='logOut'> Search </button>  </Link>
        <Link to = "/"> <button className='logOut'> Log out </button>  </Link>

        </div>
      
      </div>

        {messagePending && <div className='loading'> Loading..... </div>}


        {allMessages && (

          allMessages.map(message => (
              

              <div key = {message.id} className='message'>

                <h3 className='messagelabel'> User: {message.userName}</h3>
                <h3 className='messagelabel'> Message: {message.message} </h3>


                <div className='twoButtons'>
                <button onClick={ () => VoteUp(message.id) } className='voteButton'> 👍 {message.thumUp} </button>
                <button onClick={ () => VoteDown(message.id) } className='voteButton' > 👎 {message.thumDown} </button>
                </div>

                {parseInt(userId) === 1 && (
                                <button onClick={ () => deleteMessage(message.id)} className='deleteButton'> DELETE MESSAGE </button>
                            )}
                

                {message.replied && (
                  <div>
                    <h3 className='replyHeading'> Replies:  </h3>
                    {allReplies && allReplies.map(single_reply => (

                      
                      (parseInt(message.id) === parseInt(single_reply.parentID) )
                      ? (
                        <div>
                          {/* <p> REPLY: </p> */}
                          
                          <p className='replyLabel' >Reply from {single_reply.userName}: {single_reply.message}</p>

                          <div className='twoButtons'>
                          <button onClick={ () => VoteUp(single_reply.id) } className='voteButton'> 👍 {single_reply.thumUp} </button>
                          <button onClick={ () => VoteDown(single_reply.id) } className='voteButton'> 👎 {single_reply.thumDown} </button>

                          {parseInt(userId) === 1 && (
                                <button onClick={ () => deleteReply(single_reply.id)} className='deleteButton'> DELETE REPLY </button>
                            )}
                          </div>

                        </div>
                      ) 
                      : <p></p>

                    ))}
                  </div>
                )}

                <form onSubmit={addReply} className='replyForm'>

                <label className='replyLabel'>Type your Reply: </label>
                <input className='replyInput'
                    type="text"
                    required
                    value={reply}
                    onChange = { (e) => {setReply(e.target.value);
                                        setReplyParentId(message.id)} }
                />
                <button type="submit" className='replySubmit'> Send Reply </button>
                </form>
                  

              

              </div>

          ))
      )}


        <div>

        <form onSubmit={addMessage} className='addMessage'>


        <label className='messageLabel'>Type your Message: </label>
        <input className='messageInput'
            type="text"
            required
            value={message}
            onChange = { (e) => setMessage(e.target.value) }
        />
        <button type="submit" className='messageSend'> Send Message </button>
        </form>

        </div>

    </div>

  );

}

export default Channel;