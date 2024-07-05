const mongoose = require("mongoose")
const mongoUri = "mongodb://localhost:27017/brendthetrend"

const connectToMongo = async()=>{
   await mongoose.connect(mongoUri) .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
   
}

module.exports = connectToMongo