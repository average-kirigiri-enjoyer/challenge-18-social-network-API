const {Schema, model, Types} = require('mongoose');

const reactionSchema = new Schema(
{
  reactionId:
  {
    type: Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody:
  {
    type: String,
    required: true,
    maxLength: 280,
  },
  username:
  {
    type: String,
    ref: 'User',
    required: true,
  },
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

//virtual property for reactionSchema which formats the creation date upon query
reactionSchema.virtual('formattedDate').get(function()
{
  return this.createdAt.toISOString().split('T')[0];
});

//defines schema for a new thought model
const thoughtSchema = new Schema(
{
  thoughtText:
  {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt:
  {
    type: Date,
    default: Date.now,
  },
  username:
  {
    type: String,
    ref: 'User',
    required: true,
  },
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

//virtual property for thoguhtSchema which formats the creation date upon query
thoughtSchema.virtual('formattedDate').get(function()
{
  return this.createdAt.toISOString().split('T')[0];
});

thoughtSchema.virtual('reactionCount').get(function()
{
  return this.reactions.length;
});

//initializes the thought model using the above schema
const Thought = model('Thought', thoughtSchema);

module.exports = {Thought};