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



        <select value={selectedOption} onChange={handleDropBoxChange}>
        <option value=""> Select Options </option>
        <option value="Search String"> Search String </option>
        <option value="Specific user content"> Specific User Content </option>
        <option value="Rank Users on basic of number of posts (Highest to lowest)"> Rank Users on basic of number of posts </option>
        <option value="Rank Messages by number of likes (Highest to Lowest)"> Highest ranking of messages </option>
        </select>


        {(selectedOption === 'Search String') && (
            <div>
                <label> Search String: </label>
                <input type="text" value={searchString} onChange={handleSearchString} />
                <label> Search Channel: </label>
                <input type="text" value={searchChannel} onChange={handleSearchChannel} />
                <button onClick={getStrings}> Search String </button>
            </div>
        )}



      {(selectedOption === 'Specific user content') && (
            <div>
                <label> Search User Name: </label>
                <input type="text" value={searchUser} onChange={handleSearchUser} />
                <label> Search Channel: </label>
                <input type="text" value={searchChannel} onChange={handleSearchChannel} />
                <button onClick={getUserContent}> Search String </button>
            </div>
        )}



      {(selectedOption === 'Rank Users on basic of number of posts (Highest to lowest)') && (
            <div>
                <label> Search Channel: </label>
                <input type="text" value={searchChannel} onChange={handleSearchChannel} />
                <button onClick={getUsersMostPost}> Rank Users </button>
            </div>
        )}



      {(selectedOption === 'Rank Messages by number of likes (Highest to Lowest)') && (
            <div>
                <label> Search Channel: </label>
                <input type="text" value={searchChannel} onChange={handleSearchChannel} />
                <button onClick={getLikedMostPost}> Rank Users </button>
            </div>
        )}


        {result && (

            result.map(message =>
          <div>

                { message.userID && (
                  <h3> USER ID: {message.userID} </h3>
                )}

                { message.userName && (
                  <h3> USER NAME: {message.userName} </h3>
                )}

                { message.message && (
                  <h3> Message: {message.message} </h3>
                )}
                
                { message.thumUp && (
                  <h3> Thumb Ups: {message.thumUp} </h3>
                )}

                { message.thumDown && (
                  <h3> Thumb Downs: {message.thumDown} </h3>
                )}
                <h3> ...................................................................... </h3>


          </div>)
        )}




        </div>
    );


}
 
export default Search;