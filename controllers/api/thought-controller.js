//importing mongoose models
const router = require ('express').Router();
const {User, Thought} = require('../../models');

//GET route to retrieve all thoughts
router.get('/', async (req, res) =>
{
  try
  {
    const result = await Thought.find({});
    res.status(200).json(result);
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

//GET route to retrieve a specific thought by ID
router.get('/:id', async (req, res) =>
{
  try
  {
    const result = await Thought.findOne({_id: req.params.id});
    res.status(200).json(result);
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

//POST route to create a new thought
router.post('/', async (req, res) =>
{
  try
  {
    const newThought = new Thought(
    {
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });
  
    if (!newThought)
    {
      console.log('an error occured while trying to create the thought');
      res.status(500).json({message: 'an error occured while trying to create the thought'});
      return;
    }

    newThought.save();

    const updatedUser = await User.findOneAndUpdate({username: newThought.username},
    {
      $addToSet: {thoughts: newThought._id},
    }, {new: true});

    res.status(200).json({newThought, updatedUser});
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

//PUT route to update a specific thought by ID
router.put('/:id', async (req, res) =>
{
  try
  {
    const updatedThought = await Thought.findOneAndUpdate({_id: req.params.id},
    {
      thoughtText: req.body.thoughtText,
    }, {new: true}); //returns updated data

    if (updatedThought)
    {
      res.status(200).json(updatedThought);
    }
    else
    {
      console.log('an error occured while trying to update the thought');
      res.status(500).json({message: 'an error occured while trying to update the thought'});
    }
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

//DELETE route to delete a specific thought by ID
router.delete('/:id', async (req, res) =>
{
  try
  {
    const deletedThought = await Thought.findOneAndDelete({_id: req.params.id});

    if (!deletedThought)
    {
      console.log('an error occured while trying to delete the thought');
      res.status(500).json({message: 'an error occured while trying to delete the thought'});
      return;
    }

    await User.findOneAndUpdate({username: deletedThought.username},
    {
      $pull: {thoughts: deletedThought._id},
    }, {new: true});

    res.status(200).json({message: 'the following thought has been deleted;', deletedThought});
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

//POST route to add a reaction to a thought
router.post('/:id/reactions', async (req, res) =>
{
  try
  {
    const newReaction =
    {
      reactionBody: req.body.reactionBody,
      username: req.body.username,
    };

    if (!newReaction)
    {
      console.log('an error occured while trying to create the reaction');
      res.status(500).json({message: 'an error occured while trying to create the reaction'});
      return;
    }

    const updatedThought = await Thought.findOneAndUpdate({_id: req.params.id},
    {
      $addToSet: {reactions: newReaction},
    }, {new: true}); 
  
    if (updatedThought)
    {
      res.status(200).json(updatedThought);
    }
    else
    {
      console.log('an error occured while trying to add a reaction');
      res.status(500).json({message: 'an error occured while trying to add a reaction'});
    }
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

//DELETE route to remove a reaction from a thought
router.delete('/:id/reactions/:reactionId', async (req, res) =>
{
  try
  {
    const updatedThought = await Thought.findOneAndUpdate({_id: req.params.id},
    {
      $pull: {reactions: {reactionId: req.params.reactionId}},
    }, {new: true}); 
  
    if (updatedThought)
    {
      res.status(200).json(updatedThought);
    }
    else
    {
      console.log('an error occured while trying to remove a reaction');
      res.status(500).json({message: 'an error occured while trying to remove a reaction'});
    }
  }
  catch (err)
  {
    console.log('an error occured while trying to fulfill your request;', err);
    res.status(500).json({message: 'an error occured while trying to fulfill your request'});
  }
});

module.exports = router;