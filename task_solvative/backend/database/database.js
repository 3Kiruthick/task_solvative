

const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/my-database";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
});
let db = mongoose.connection;

db.once('open', () => {
  console.log('Connection Successful');
});

db.on('error', () => {
  console.log('Error in mongodb connection');
});

module.exports = mongoose;