/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 18 Weekly Challenge - Social Network API
Created 2023/11/26
Last Edited 2023/12/03
*/

//importing packages & other files necessary for the application
const express = require('express');
const db = require('./config/connection');
const routes = require('./controllers');

//initializes express application
const app = express();

//defines application port
const PORT = process.env.PORT || 3001;

app.use(express.json()); //sets application to process incoming JSON data
app.use(express.urlencoded({extended: true})); //sets application to process incoming URL-encoded data
app.use(routes); //sets application to use predefined routes

//once a connection is successfully established with the mongoDB server, start running the server at the appropriate port
db.once('open', () =>
{
  app.listen(PORT, () =>
  {
    console.log(`API server running on port ${PORT}!`);
  });
});
