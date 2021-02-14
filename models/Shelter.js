const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const shelterSchema = new Schema({
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
  name: String, 
  street: String, 
  city: String,
  postcode: String,  
  description: String
}  
);

const Shelter = model("Shelter", shelterSchema);

module.exports = Shelter;