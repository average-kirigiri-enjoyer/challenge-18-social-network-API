//imports mongoose package functionality to connect to mongoDB database
//==============================================================
const {connect, connection} = require('mongoose');
//==============================================================

//initializes connection to socialnetworkDB in mongoDB via mongoose
//==============================================================
connect('mongodb://127.0.0.1:27017/socialnetworkDB');
//==============================================================

//exports mongoDB connection
//==============================================================
module.exports = connection;
//==============================================================