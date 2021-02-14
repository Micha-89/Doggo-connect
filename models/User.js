const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
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

 }
);

const User = model("User", userSchema);

module.exports = User;
