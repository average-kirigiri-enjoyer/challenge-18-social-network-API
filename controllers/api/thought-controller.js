//importing mongoose models & express router
//==============================================================
const router = require ('express').Router();
const {User, Thought} = require('../../models');
//==============================================================

//GET route to retrieve all thoughts
//==============================================================
router.get('/', async (req, res) =>
{
  try
  {
    const thoughts = await Thought.find({}); //attempts to retrieve all documents from the thought collection
    res.status(200).json(thoughts); //returns all thoughts retrieved from collection as JSON with a status 200
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//GET route to retrieve a specific thought by ID
//==============================================================
router.get('/:id', async (req, res) =>
{
  try
  {
    const thought = await Thought.findOne({_id: req.params.id}); //attempts to retrieve a specific document from the thought collection via objectId
    res.status(200).json(thought); //returns the thought retrieved from the collection as JSON with a status 200
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//POST route to create a new thought
//==============================================================
router.post('/', async (req, res) =>
{
  try
  {
    //creates a new thought document using data from the request body
    const newThought = new Thought(
    {
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });
  
    //if the above new thought is undefined, log an error message to the console, and return a similar message as JSON with a status 500, before ejecting from the function
    if (!newThought)
    {
      console.log('an error occured while trying to create the thought');
      res.status(500).json({message: 'an error occured while trying to create the thought'});
      return;
    }

    //otherwise, i.e. the thought was successfully created, save it to the collection
    newThought.save();

    //find the user that created the thought via their username, and add the new thought's objectId to the user's thoughts array
    const updatedUser = await User.findOneAndUpdate({username: newThought.username},
    {
      $addToSet: {thoughts: newThought._id},
    }, {new: true}); //returns updated user data

    //return the new thought & the updated user as JSON alongside a status 200
    res.status(200).json({newThought, updatedUser});
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//PUT route to update a specific thought by ID
//==============================================================
router.put('/:id', async (req, res) =>
{
  try
  {
    //updates a specific thought's text via its objectId
    const updatedThought = await Thought.findOneAndUpdate({_id: req.params.id},
    {
      thoughtText: req.body.thoughtText,
    }, {new: true}); //returns updated data

    //if the updated thought exists, return it as JSON with a status 200
    if (updatedThought)
    {
      res.status(200).json(updatedThought);
    }
    else //otherwise, i.e. the updated thought does not exist, return an error message with status 500 & log it to the console
    {
      console.log('an error occured while trying to update the thought');
      res.status(500).json({message: 'an error occured while trying to update the thought'});
    }
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//DELETE route to delete a specific thought by ID
//==============================================================
router.delete('/:id', async (req, res) =>
{
  try
  {
    //deletes a specific thought by its objectId
    const deletedThought = await Thought.findOneAndDelete({_id: req.params.id});

    //if the deleted thought does not exist, i.e. no object was found & deleted, log an error message to console, return it as JSON with a status 500, and eject from the function
    if (!deletedThought)
    {
      console.log('an error occured while trying to delete the thought');
      res.status(500).json({message: 'an error occured while trying to delete the thought'});
      return;
    }

    //removes the deleted thought's objectId from the appropriate user's thoughts array
    await User.findOneAndUpdate({username: deletedThought.username},
    {
      $pull: {thoughts: deletedThought._id},
    });

    //returns the deleted thought as JSON alongside a status 200
    res.status(200).json({message: 'the following thought has been deleted;', deletedThought});
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//POST route to add a reaction to a thought
//==============================================================
router.post('/:id/reactions', async (req, res) =>
{
  try
  {
    //creates a new reaction using data from the request body
    const newReaction =
    {
      reactionBody: req.body.reactionBody,
      username: req.body.username,
    };

    //if the above reaction does not exist, i.e. the reaction was not successfully created, return a status 500 error message, log it to the console, and eject from the function
    if (!newReaction)
    {
      console.log('an error occured while trying to create the reaction');
      res.status(500).json({message: 'an error occured while trying to create the reaction'});
      return;
    }

    //adds the newly-created reaction to the appropriate thought's reactions array
    const updatedThought = await Thought.findOneAndUpdate({_id: req.params.id},
    {
      $addToSet: {reactions: newReaction},
    }, {new: true}); //returns updated data
  
    //if the reaction was successfully added, return the updated thought as JSON with a status 200
    if (updatedThought)
    {
      res.status(200).json(updatedThought);
    }
    else //otherwise, i.e. the reaction was not successfully added, return a status 500 error message and log it to console
    {
      console.log('an error occured while trying to add a reaction');
      res.status(500).json({message: 'an error occured while trying to add a reaction'});
    }
  }
  catch (err) //catch any errors that occur, log it to console, and return it as JSON with a status 500 error message
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request', err});
  }
});
//==============================================================

//DELETE route to remove a reaction from a thought
//==============================================================
router.delete('/:id/reactions/:reactionId', async (req, res) =>
{
  try
  {
    //removes the desired reaction from the appropriate thought's reactions array via the reactionId
    const updatedThought = await Thought.findOneAndUpdate({_id: req.params.id},
    {
      $pull: {reactions: {reactionId: req.params.reactionId}},
    }, {new: true}); //returns updated data
  
    //if the reaction was successfully removed from the thought, return the updated thought with a status 200
    if (updatedThought)
    {
      res.status(200).json(updatedThought);
    }
    else //otherwise, i.e. the reaction was not successfully removed, return a status 500 error message and log it to console
    {
      console.log('an error occured while trying to remove a reaction');
      res.status(500).json({message: 'an error occured while trying to remove a reaction'});
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