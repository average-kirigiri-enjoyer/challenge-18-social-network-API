//importing packages & models
const router = require ('express').Router();
const {User} = require('../../models');

//GET route to retrieve all users
router.get('/', async (req, res) =>
{
  try
  {
    const result = await User.find({});
    res.status(200).json(result);
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

//GET route to retrieve a specific user by ID
router.get('/:id', async (req, res) =>
{
  try
  {
    const result = await User.findOne({_id: req.params.id});
    res.status(200).json(result);
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

//POST route to create a new user
router.post('/', async (req, res) =>
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
      console.log('an error occured while trying to create the user;', err);
      res.status(500).json({message: 'an error occured while trying to create the user'});
    }
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

//PUT route to update a specific user by ID
router.put('/:id', async (req, res) =>
{
  try
  {
    const updatedUser = await User.findOneAndUpdate({_id: req.params.id},
    {
      username: req.body.username,
      email: req.body.email,
    }, {new: true, runValidators: true}); //returns updated data, and runs validators before updating

    if (updatedUser)
    {
      res.status(200).json(updatedUser);
    }
    else
    {
      console.log('an error occured while trying to update the user;', err);
      res.status(500).json({message: 'an error occured while trying to update the user'});
    }
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

//DELETE route to delete a specific user by ID
router.delete('/:id', async (req, res) =>
{
  try
  {
    const deletedUser = await User.findOneAndDelete({_id: req.params.id});

    if (deletedUser)
    {
      res.status(200).json({message: 'the following user has been deleted;', deletedUser});
    }
    else
    {
      console.log('an error occured while trying to delete the user;', err);
      res.status(500).json({message: 'an error occured while trying to delete the user'});
    }
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

//POST route to add a friend to a user's friend list
router.post('/:id/friends/:friendId', async (req, res) =>
{
  try
  {
    const updatedUser = await User.findOneAndUpdate({_id: req.params.id},
    {
      $addToSet: {friends: req.params.friendId},
    }, {new: true}); 
  
    if (updatedUser)
    {
      res.status(200).json(updatedUser);
    }
    else
    {
      console.log('an error occured while trying to add a friend;', err);
      res.status(500).json({message: 'an error occured while trying to add a friend'});
    }
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

//DELETE route to remove a friend from a user's friend list
router.delete('/:id/friends/:friendId', async (req, res) =>
{
  try
  {
    const updatedUser = await User.findOneAndUpdate({_id: req.params.id},
    {
      $pull: {friends: req.params.friendId},
    }, {new: true}); 
  
    if (updatedUser)
    {
      res.status(200).json(updatedUser);
    }
    else
    {
      console.log('an error occured while trying to remove a friend;', err);
      res.status(500).json({message: 'an error occured while trying to remove a friend'});
    }
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

module.exports = router;