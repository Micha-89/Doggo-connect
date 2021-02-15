const { Schema, model } = require("mongoose");
const dogSchema = new Schema({
  name: String,
  shelter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  image: String,
  description: String,
  gender: String,
  breed: String,
  size: String,
  age: Number
}
);
const Dog = model("Dog", dogSchema);
module.exports = Dog;