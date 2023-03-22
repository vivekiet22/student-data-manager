const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path')

const authRoute = require("./routes/authRoute");
const dashboardRoute = require("./routes/dashboardRoute");

let cors = require('cors')


dotenv.config();

const app = express();


const DB = process.env.DB
// const DB = 'mongodb://127.0.0.1:27017/student_data_manager'
try {
    mongoose.connect(DB).then(()=>console.log("Connected to DB Successfully"));
  } catch (error) {
    handleError(error);
  }

app.use(express.json());


app.use(cors())


app.use("/", authRoute);
app.use("/dashboard",dashboardRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


const port = 5000;

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});