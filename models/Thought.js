const {Schema, model} = require('mongoose');

const reactionSchema = new Schema(
{
  reactionId:
  {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
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
  toJSON:
  {
    virtuals: true,
  }
});

//virtual property for reactionSchema which formats the creation date upon query
reactionSchema.virtual('formattedDate').get(() =>
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
  toJSON:
  {
    virtuals: true,
  },
});

//virtual property for thoguhtSchema which formats the creation date upon query
thoughtSchema.virtual('formattedDate').get(() =>
{
  return this.createdAt.toISOString().split('T')[0];
});

thoughtSchema.virtual('reactionCount').get(() =>
{
  return this.reactions.length;
});

//initializes the thought model using the above schema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;