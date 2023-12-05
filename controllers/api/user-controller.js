//importing mongoose models & express router
//==============================================================
const router = require ('express').Router();
const {User} = require('../../models');
//==============================================================

//GET route to retrieve all users
//==============================================================
router.get('/', async (req, res) =>
{
  try
  {
    const users = await User.find({}); //attempts to retrieve all documents from the user collection
    res.status(200).json(users); //returns all users retrieved from collection as JSON with a status 200
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//GET route to retrieve a specific user by ID
//==============================================================
router.get('/:id', async (req, res) =>
{
  try
  {
    const user = await User.findOne({_id: req.params.id}); //attempts to retrieve a specific document from the user collection via objectId
    res.status(200).json(user); //returns the user retrieved from the collection as JSON with a status 200
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//POST route to create a new user
//==============================================================
router.post('/', async (req, res) =>
{
  try
  {
    //creates a new user document using data from the request body
    const newUser = new User(
    {
      username: req.body.username,
      email: req.body.email,
    });
  
    //if the user was successfully created, save it to the database, and return it as JSON with a status 200
    if (newUser)
    {
      newUser.save();
      res.status(200).json(newUser);
    }
    else //otherwise, i.e. the user was not successfully created, log an error message to the console, and return it JSON with a status 500
    {
      console.log('an error occured while trying to create the user');
      res.status(500).json({message: 'an error occured while trying to create the user'});
    }
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//PUT route to update a specific user by ID
//==============================================================
router.put('/:id', async (req, res) =>
{
  try
  {
    //updates a specific user's username / email via its objectId
    const updatedUser = await User.findOneAndUpdate({_id: req.params.id},
    {
      username: req.body.username,
      email: req.body.email,
    }, {new: true, runValidators: true}); //returns updated data, and runs validators before updating

    //if the user was successfully created, return it as JSON with a status 200
    if (updatedUser)
    {
      res.status(200).json(updatedUser);
    }
    else //otherwise, i.e. the user was not successfully updated, log an error message to the console, and return it JSON with a status 500
    {
      console.log('an error occured while trying to update the user');
      res.status(500).json({message: 'an error occured while trying to update the user'});
    }
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//DELETE route to delete a specific user by ID
//==============================================================
router.delete('/:id', async (req, res) =>
{
  try
  {
    //deletes a specific user by its objectId
    const deletedUser = await User.findOneAndDelete({_id: req.params.id});

    //if the deleted user exists, return it as JSON alongside a status 200
    if (deletedUser)
    {
      res.status(200).json({message: 'the following user has been deleted;', deletedUser});
    }
    else //otherwise, i.e. the user was not successfully deleted, log an error message to console & return it as JSON with a status 500
    {
      console.log('an error occured while trying to delete the user');
      res.status(500).json({message: 'an error occured while trying to delete the user'});
    }
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//POST route to add a friend to a user's friend list
//==============================================================
router.post('/:id/friends/:friendId', async (req, res) =>
{
  try
  {
    //finds a user by objectId, and adds the friend's objectId to the user's friends array
    const updatedUser = await User.findOneAndUpdate({_id: req.params.id},
    {
      $addToSet: {friends: req.params.friendId},
    }, {new: true}); //returns updated data
  
    //if the updated user exists, return it as JSON with a status 200
    if (updatedUser)
    {
      res.status(200).json(updatedUser);
    }
    else //otherwise, i.e. the friend was not successfully added, log an error message to console & return it as JSON with a status 500
    {
      console.log('an error occured while trying to add a friend');
      res.status(500).json({message: 'an error occured while trying to add a friend'});
    }
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//DELETE route to remove a friend from a user's friend list
//==============================================================
router.delete('/:id/friends/:friendId', async (req, res) =>
{
  try
  {
    //finds a user by objectId and remove the friend's objectId from the user's friends array
    const updatedUser = await User.findOneAndUpdate({_id: req.params.id},
    {
      $pull: {friends: req.params.friendId},
    }, {new: true}); //returns updated data
  
    //if the updated user exists, return it as JSON with a status 200
    if (updatedUser)
    {
      res.status(200).json(updatedUser);
    }
    else //otherwise, i.e. the friend was not successfully removed, log an error message to console & return it as JSON with a status 500
    {
      console.log('an error occured while trying to remove a friend');
      res.status(500).json({message: 'an error occured while trying to remove a friend'});
    }
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//exports router settings
//==============================================================
module.exports = router;
//==============================================================