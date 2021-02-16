const { Schema, model } = require("mongoose");
const dogSchema = new Schema({
  name: String,
  shelter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  messages:[
    {
      message: String,
      applicant: {
        type: Schema.Types.ObjectId,
        ref:'User'
      },
      created: {
        type: Date,
        default: new Date()
      }
    }
  ],
  imageUrl: String,
  publicId: String,
  description: String,
  gender: String,
  breed: String,
  size: String,
  age: Number
}
);
const Dog = model("Dog", dogSchema);
module.exports = Dog;