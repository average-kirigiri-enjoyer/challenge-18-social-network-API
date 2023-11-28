const {Schema, model} = require('mongoose');

//defines schema for a new user model
const userSchema = new Schema(
{
  //username is a string, required, must be unique, and has whitespaces trimmed
  username:
  {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email:
  {
    type: String, //email is a string
    required: true, //email is required
    unique: true, //email must be unique
    validate:
    {
      validator: function(email) //email is checked against an email regex to ensure it is valid
      {
        const emailRegex = /^([\w\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        return emailRegex.test(email);
      },
      message: 'The provided email is invalid', //if the validation fails, return this error message
    },
  },
  //thoughts are an array of objectIDs of each 'thought' associated with a specific user
  thoughts: 
  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }
  ],
  //friends are an array of objectIDs of each user who is friends with a specific user
  friends:
  [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

//initializes the user model using the above schema
const User = model('User', userSchema);

module.exports = User;