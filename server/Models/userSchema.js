const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
   age: {
    type: Number,
  },
  adress: {
    type: String,
    require: true,
  },
 phone_number: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
     default: "user",
  },
   number_of_car: {
    type: Number,
  },
 license_plate_number: {
    type: Number,
    require: true,
  },


});

const User = mongoose.model("User", userSchema);
module.exports = User;
