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
    const [searchString, setSearchString] = useState("");
    const [error, setError] = useState("");
    const [searchChannel, setSearchChannel] = useState("");
    const [result, setResult] = useState(null);


    const [searchUser, setSearchUser] = useState("");


    const handleSearchString = (event) => {
        setSearchString(event.target.value);
    }

    const handleSearchChannel = (event) => {
      setSearchChannel(event.target.value);
  }


  const handleSearchUser = (event) => {
    setSearchUser(event.target.value);
}


    // for the dropbox
    const [selectedOption, setSelectedOption] = useState('');


    const handleDropBoxChange = (event) => {
        setSelectedOption(event.target.value);
      }


    
      const getStrings = event => {
        event.preventDefault();
        fetch(`http://localhost:8080/getChannelMessages/${searchString}/${searchChannel}`)
          .then(response => response.json())
          .then(data => {
            if (data) {
              console.log(data);
              setResult(data);
            } else {
              setError(' NOTHING FOUND ');
            }
          })
          .catch(error => console.error(error));
      };



      const getUserContent = event => {
        event.preventDefault();
        fetch(`http://localhost:8080/getUserContent/${searchUser}/${searchChannel}`)
          .then(response => response.json())
          .then(data => {
            if (data) {
              console.log(data);
              setResult(data);
            } else {
              setError(' NOTHING FOUND ');
            }
          })
          .catch(error => console.error(error));
      };


      const getUsersMostPost = event => {
        event.preventDefault();
        fetch(`http://localhost:8080/rankUsersByMessages/${searchChannel}`)
          .then(response => response.json())
          .then(data => {
            if (data) {
              console.log(data);
              setResult(data);
            } else {
              setError(' NOTHING FOUND ');
            }
          })
          .catch(error => console.error(error));
      };



      const getLikedMostPost = event => {
        event.preventDefault();
        fetch(`http://localhost:8080/orderByThumbsUp/${searchChannel}`)
          .then(response => response.json())
          .then(data => {
            if (data) {
              console.log(data);
              setResult(data);
            } else {
              setError(' NOTHING FOUND ');
            }
          })
          .catch(error => console.error(error));
      };


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



            {user && (
                <div className='navbar'>

                    {/* LATER USE IT FOR VAVIGATION BAR */}


                    <h3> Hello {user.name} !!! </h3>

                    {/* <label> Id: </label>
                    <h3> {user.id} </h3>

                    <label> User Id:  </label>
                    <h3> {user.userId} </h3> */}
                    <div className='navbarButtons'>

                    <Link to = {`/home/${userId}`}> <button className='logOut'> Home </button>  </Link>
                    <Link to = "/"> <button className='logOut'> Log out </button>  </Link>

                    </div>

            
                </div> 
            )}


        <div className='selectOptions'> 

        <label className='selectLabel'> Select Option: </label>

        <select value={selectedOption} onChange={handleDropBoxChange} className='message'>
        <option value=""> Select Options </option>
        <option value="Search String"> Search String </option>
        <option value="Specific user content"> Specific User Content </option>
        <option value="Rank Users on basic of number of posts (Highest to lowest)"> Rank Users on basic of number of posts </option>
        <option value="Rank Messages by number of likes (Highest to Lowest)"> Highest ranking of messages </option>
        </select>

        </div>


        {(selectedOption === 'Search String') && (

            <div className='message'>
                <label className='messageLabel'> Search String: </label>
                <input type="text" value={searchString} onChange={handleSearchString} className='messageInput' />
                <label className='messageLabel'> Search Channel: </label>
                <input type="text" value={searchChannel} onChange={handleSearchChannel} className='messageInput' />
                <button onClick={getStrings} className='searchButton'> Search String </button>
            </div>

        )}



      {(selectedOption === 'Specific user content') && (
            <div className='message'>
                <label className='messageLabel'> Search User Name: </label>
                <input type="text" value={searchUser} onChange={handleSearchUser} className='messageInput'/>
                <label className='messageLabel'> Search Channel: </label>
                <input type="text" value={searchChannel} onChange={handleSearchChannel} className='messageInput'/>
                <button onClick={getUserContent} className='searchButton'> Search String </button>
            </div>
        )}



      {(selectedOption === 'Rank Users on basic of number of posts (Highest to lowest)') && (
            <div className='message'>
                <label className='messageLabel'> Search Channel: </label>
                <input type="text" value={searchChannel} onChange={handleSearchChannel} className='messageInput' />
                <button onClick={getUsersMostPost} className='searchButton'> Rank Users </button>
            </div>
        )}



      {(selectedOption === 'Rank Messages by number of likes (Highest to Lowest)') && (
            <div className='message'>
                <label className='messageLabel'> Search Channel: </label>
                <input type="text" value={searchChannel} onChange={handleSearchChannel} className='messageInput'/>
                <button onClick={getLikedMostPost} className='searchButton'> Rank Users </button>
            </div>
        )}


        {result && (

            result.map(message =>
          <div className='message'>

                { message.userID && (
                  <h3 className='messageLabel'> USER ID: {message.userID} </h3>
                )}

                { message.userName && (
                  <h3 className='messageLabel'> USER NAME: {message.userName} </h3>
                )}

                { message.message && (
                  <h3 className='messageLabel'> Message: {message.message} </h3>
                )}
                
                { message.thumUp && (
                  <h3 className='messageLabel'> Thumb Ups: {message.thumUp} </h3>
                )}

                { message.thumDown && (
                  <h3 className='messageLabel'> Thumb Downs: {message.thumDown} </h3>
                )}


          </div>)
        )}




        </div>
    );


}
 
export default Search;