//importing mongoose models
const {User} = require('../../models');

//GET route to retrieve all users
app.get('/', async (req, res) =>
{
  try
  {
    const result = await User.find({});
    res.status(200).json(result);
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request', err);
    res.status(500).json({name: 'an error occured while trying to fulfill your request'});
  }
});

//GET route to retrieve a specific user by ID
app.get('/:id', async (req, res) =>
{
  try
  {
    const result = await User.findbyID(req.params.id);
    res.status(200).json(result);
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request', err);
    res.status(500).json({name: 'an error occured while trying to fulfill your request'});
  }
});

//POST route to create a new user
app.post('/', (req, res) =>
{
  try
  {
    const newUser = new User(
    {
      username: req.body.username,
      email: req.body.email,
    });
  
    newUser.save();
  
    if (newUser)
    {
      res.status(200).json(newUser);
    }
    else
    {
      console.log('an error occured while trying to create the user', err);
      res.status(500).json({name: 'an error occured while trying to create the user'});
    }
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request', err);
    res.status(500).json({name: 'an error occured while trying to fulfill your request'});
  }
});

//PUT route to update a specific user by ID
app.put('/:id', async (req, res) =>
{
  try
  {
    const updatedUser = await User.findOneAndUpdate({_id: req.params.id},
    {
      username: req.body.username,
      email: req.body.email,
    }, {new: true});

    if (updatedUser)
    {
      res.status(200).json(updatedUser);
    }
    else
    {
      console.log('an error occured while trying to update the user', err);
      res.status(500).json({name: 'an error occured while trying to update the user'});
    }
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request', err);
    res.status(500).json({name: 'an error occured while trying to fulfill your request'});
  }
});

//DELETE route to delete a specific user by ID
app.delete('/:id', async (req, res) =>
{
  try
  {
    const deletedUser = await User.findOneAndDelete({_id: req.params.id});

    if (deletedUser)
    {
      res.status(200).json(deletedUser);
    }
    else
    {
      console.log('an error occured while trying to delete the user', err);
      res.status(500).json({name: 'an error occured while trying to delete the user'});
    }
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request', err);
    res.status(500).json({name: 'an error occured while trying to fulfill your request'});
  }
});

//post route to add a friend to a user's friend list
  //gets user objectId from route parameters
  //gets friend objectId from route parameters
  //adds friend's objectId to an array contained in the user document

//delete route to remove a friend from a user's friend list
  //gets user objectId from route parameters
  //gets friend objectId from route parameters
  //removes friend's objectId from an array contained in the user document