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
    
    // close the connection
    connection.end(function (error) {
    if (error) throw error;
    console.log('Connection closed');
    });
});
});