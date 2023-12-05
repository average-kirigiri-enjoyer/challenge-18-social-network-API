//imports functionality from mongoose to create models
//==============================================================
const {Schema, model} = require('mongoose');
//==============================================================

//initializes reaction schema
//==============================================================
const reactionSchema = new Schema(
{
  //reactionId property is an objectId, default value a new objectId value
  reactionId:
  {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  //reactionBody is a required string, max length of 280 characters
  reactionBody:
  {
    type: String,
    required: true,
    maxLength: 280,
  },
  //username is a required string, referencing the user that created the reaction from the User collection
  username:
  {
    type: String,
    ref: 'User',
    required: true,
  },
  //createdAt is a date, default value the current timestamp
  createdAt:
  {
    type: Date,
    default: Date.now,
  },
},
{
  //allows the display of virtuals when returning JSON data
  toJSON:
  {
    virtuals: true,
  },
  id: false, //excludes extra ID value when returning JSON data
});
//==============================================================

//virtual property for reactionSchema which formats the creation date upon query
//==============================================================
reactionSchema.virtual('formattedDate').get(function()
{
  return this.createdAt.toISOString().split('T')[0];
});
//==============================================================

//initializes thought
//==============================================================
const thoughtSchema = new Schema(
{
  //thought text is a required string, length of 1-280 characters
  thoughtText:
  {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  //createdAt is a date, default value the current timestamp
  createdAt:
  {
    type: Date,
    default: Date.now,
  },
  //username is a required string, referencing the user that created the thought from the User collection
  username:
  {
    type: String,
    ref: 'User',
    required: true,
  },
  //reactions is an array of objects - specifically, subdocuments built off the reactionSchema above
  reactions: [reactionSchema],
},
{
  //allows the display of virtuals when returning JSON data
  toJSON:
  {
    virtuals: true,
  },
  id: false, //excludes extra ID value when returning JSON data
});
//==============================================================

//virtual property for thoughtSchema which formats the creation date upon query
//==============================================================
thoughtSchema.virtual('formattedDate').get(function()
{
  return this.createdAt.toISOString().split('T')[0];
});
//==============================================================

//virtual property for thought schema which returns the number of reactions to that thought
//==============================================================
thoughtSchema.virtual('reactionCount').get(function()
{
  return this.reactions.length;
});
//==============================================================

//initializes the thought model using the above schema
//==============================================================
const Thought = model('Thought', thoughtSchema);
//==============================================================

//exports thought model
//==============================================================
module.exports = Thought;
//==============================================================