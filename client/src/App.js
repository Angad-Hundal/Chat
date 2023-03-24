
import React, { Component } from 'react';
import Login from './Login';
import { BrowserRouter as Router, Switch, Routes, Route, Link } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Home from './Home';
import Channel from './Channel';
import NotFound from './NotFound';


function App() {

  return (
    <div className="App">

      <Router>
      {/* <Login> </Login> */}

 
    
      <div>

      <Routes>
        <Route exact path='/' element = {<Login/>} />
        <Route exact path='/createAccount' element = {<CreateAccount/>} />
        <Route path='/channels/:ChannelName/:userId' element={<Channel />}  />
        {/* <Route exact path='/home' element = {<Home/>} /> */}
        <Route path='/home/:id' element={<Home/>}  />
        {/* <Route exact path='/showPosts' element = {<ShowPosts/>} />
        <Route exact path='/addPosts' element = {<AddPosts/>} /> */}
        <Route path="*" element={<NotFound/> } />
      </Routes>

     </div>

     </Router>


    </div>
  );

}

export default App;
