'use strict';

// load package
const express = require('express');
//const mysql = require('mysql');
const mysql = require('mysql');
const bodyParser = require("body-parser");


const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();


app.use( bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());



//Database Connection
const connection = mysql.createConnection({
    host: '0.0.0.0',    //localhost: Used to  locally run app
    //host: "mysql1",
    user: "root",
    //password: "admin",
    password: "12345"
});



connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
}); 



// server working
app.get('/', (req, res) => {
    res.send("PAGE WORKING");
})


// create the database chat
connection.query('CREATE DATABASE IF NOT EXISTS chat', function (error) {
    if (error) throw error;
    console.log('Database created');
  });
  

// connect to the database
connection.query('USE chat', function (error) {
if (error) throw error;
console.log('Using database chat');


// create the users table if it does not exist
connection.query(`
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
    )
`, function (error) {
    if (error) throw error;
    console.log('Users table created');
    
});




// table including all the channels
connection.query(`
    CREATE TABLE IF NOT EXISTS channels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    )
`, function (error) {
    if (error) throw error;
    console.log('Channels table created');
    
});


});



// add a channel to channel table
app.post('/addChannel', (req,res) => {

  console.log("Reached Add Channel")
  var name = req.body.newChannel;
  console.log("NAME: ", name);

  var query = `INSERT INTO chat.channels (name) VALUES ("${name}")`;
  connection.query(query, function (error,result) {
      if (error) console.log(error);
      res.send('New Channel Added');
  });
});



// get all posts from table
app.get('/getChannels', (req, res) => {

  console.log("GETTING CHANNELS")
  const sqlQuery = 'SELECT * FROM chat.channels';
  connection.query(sqlQuery, function (error,result) {
      if (error) console.log(error);
      //res.json(result);
      //res.send({ 'channels': result});
      res.send(result);
      console.log(JSON.stringify(result));
  });
});



// add a post to posts table
app.post('/addUser', (req,res) => {

    var userId = req.body.userId;
    var password = req.body.password;
    var name = req.body.name;

    var query = `INSERT INTO chat.users (userId, password, name) VALUES ("${userId}", "${password}", "${name}")`;
    connection.query(query, function (error,result) {
        if (error) console.log(error);
        res.send('New User Added');
    });
});




app.get('/getUser/:userId/:password', (req, res) => {

    const userId = req.params.userId;
    const password = req.params.password;

    console.log(userId);
    console.log(password);

    const sql = `SELECT * FROM users WHERE userId = '${userId}' AND password = '${password}'`;

    connection.query(sql, (error, results) => {
      if (error) {
        res.json(null);
        console.log("ERROR COMING");
        console.log(error);
    }

      else{

        if (results.length > 0) {
            // User found, return user data
            res.json(results[0]);
            console.log("User found");
          } else {
            // User not found or password is incorrect
            res.json(null);
            console.log("User not found or password is incorrect");
          }

      }
      
    });
  });



app.get('/getIdUser/:id', (req, res) => {

  console.log("Reached getIdUser in server");

  const id = req.params.id;
  console.log("ID: ", id);

  const sql = `SELECT * FROM chat.users WHERE id = '${id}'`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving user');
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
        //res.status(200).json(results);
        //res.send({ 'users': results});
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});


 //serves the static files in the public folder
 app.use('/', express.static('public'));
 app.listen(PORT, HOST);
 console.log(`Running on http://${HOST}:${PORT}`);