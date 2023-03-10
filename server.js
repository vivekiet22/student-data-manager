const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");


const authRoute = require("./routes/authRoute");



dotenv.config();
const app = express();



const DB = 'mongodb://127.0.0.1:27017/student_data_manager'
try {
    mongoose.connect(DB).then(()=>console.log("Connected to DB Successfully"));
  } catch (error) {
    handleError(error);
  }

app.use(express.json());



app.use("/", authRoute);


const port = 5000;

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});