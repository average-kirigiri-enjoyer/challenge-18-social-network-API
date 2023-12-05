//imports mongoDB connection & user model
//==============================================================
const db = require('../config/connection');
const {User} = require('../models');
//==============================================================

//defines sample user data
//==============================================================
const userData =
[
  {
    username: 'user',
    email: 'useremail@gmail.com',
  },
  {
    username: 'name',
    email: 'nameemail@gmail.com',
  },
  {
    username: 'HAHAHAHA',
    email: 'HAHAHAHA@gmail.com',
  }
];
//==============================================================

//function to seed database with sample data
//==============================================================
const seedDB = async (data) =>
{
  try
  {
    //initializes database connection
    db.once('open', async () =>
    {
      //attempts to find 'users' collection
      const userCollection = await db.db.listCollections({name: 'users'});

      //if the collection already exists, drop it
      if (userCollection)
      {
        await db.dropCollection('users');
      }

      await User.insertMany(data); //create new documents in the users collection using the predefined sample data
      console.log('seeding successful');
      process.exit(0); //end database connection instance
    });
  }
  catch (err) //log any errors that occur to console
  {
    console.log('error seeding database', err);
  }
}
//==============================================================

//seeds database with sample user data
//==============================================================
seedDB(userData);
//==============================================================