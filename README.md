# Module 18 Weekly Challenge - Social Network API [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

MongoDB is a very common back-end solution for social media networks due to its speed and flexibility. This repository demonstrates this functionality as a baseline for a Social Network API, with mid-back end code allowing for the creation & deletion of users, reactions, thoughts, and friends via a MongoDB database.

## Installation

Download the repository files to your computer, and extract the zipped files to a dedicated folder.

## Requirements

- Node; https://nodejs.org/en
- MongoDB; https://www.mongodb.com/

## Usage 

To run the application locally, navigate to the repository a git bash shell (or equivalent), and type "npm install" to install the application's dependencies. Next, seed the database with some sample users by typing "npm run seed". Open up an additional git bash instance, and type 'mongod' to start up your MongoDB server. Finally, you can begin running the application server by typing "npm run start".

Next, open a program such as Insomnia to interact with the server, and a program to view the contents of the database, such as MongoDB compass, if you wish to view the data directly. The PORT is set to default to 3001, so all requests should be made to "http://localhost:3001/". From here, all routes for interacting with the backend involve "/api", followed by the model you want to interact with; "/api/users" for user-related routes, and "/api/thoughts" for thought-related routes. Check the "thought-controller.js" & "user-controller.js" files in the /controllers/api folder for more information.

## Demo

See a video demonstrating the application's functionality [here](https://drive.google.com/file/d/1QT0IujdDYd3VyHcflz05rWma4tZDflyh/view?usp=sharing).

## Credits

MIT License Badge (./README.md, line 1);
https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba

## License

Operates under a standard MIT license. For more information, refer to the LICENSE file in the repository, or visit the following website; https://opensource.org/licenses/MIT.