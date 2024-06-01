const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
  },
  p5 :{
    type : Number,
    default : 100
  },
  reward : {
    type : Number,
    default : 0
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema, "user");
