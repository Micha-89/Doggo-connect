const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
      },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  password: {
    type: String
    },
  role: {
    type: String,
    enum: ['SHELTER', 'ADOPTER', 'ADMIN'],
   },
  
  name: String, 
  street: String, 
  city: String,
  coordinates: [Number],
  postcode: String,  
  description: String

 }
);

const User = model("User", userSchema);

module.exports = User;
