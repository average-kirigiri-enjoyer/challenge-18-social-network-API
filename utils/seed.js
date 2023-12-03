const db = require('../config/connection');
const {User} = require('../models');

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

const seedDB = async (data) =>
{
  try
  {
    db.once('open', async () =>
    {
      await User.insertMany(data);
      console.log('seeding successful');
      process.exit(0);
    });
  }
  catch (err)
  {
    console.log('error seeding database', err);
  }
}

seedDB(userData);