const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  rollNo: {
    type: Number,
    unique: true,
  },
  address: {
    type: String,
  },
  institute: {
    type: String,
  },
  course: {
    type: String,
  },
  email: {
    type: String
     },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
