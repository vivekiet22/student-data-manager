const CsvParser = require("json2csv").Parser;
const User = require("../models/User");
const Student = require('../models/Student')
const csv = require("csvtojson")

// fetch list of students from database
exports.fetch = async (req,res)=>{
  try {
    students =await Student.find({})
    return res.status(201).json({status:"success",students:students})
  } catch (err) {
    res.status(400).json({ status: "error", msg: err.message });
  }
}


// add a list of students from csv
exports.importStudent = async (req, res) => {
  try {
    let userData = []
    let jsonOutput =await  req.body
    //  console.log(req.body)
    // console.log("json body is ", jsonOutput)
      
    for (let x = 0;x<jsonOutput.length;x++){
      userData.push({
        name:jsonOutput[x].Name,
        rollNo:jsonOutput[x].Roll_No,
        address:jsonOutput[x].Address,
        institute:jsonOutput[x].Institute,
        course:jsonOutput[x].Course,
        email:jsonOutput[x].Email,
      })
      }
    console.log("user data ", userData)
    
    await Student.insertMany(userData).catch(()=>{});
    res.status(201).json({ status: "success",msg:"File Imported successfully",db:userData });
  } catch (err) {
    res.status(400).json({ status: "error", msg: err.message });
  }
};


// export and download csv 
exports.exportStudent = async (req, res) => {
  try {
    let students = [];
    let studentData = await Student.find({});
    // studentData.forEach((student) => {
    //   const { name, rollNo, address, institute ,course , email  } = student;
    //   students.push({ name, rollNo, address, institute ,course , email });
    // });
    // const csvFields = ["Name", "Roll_No", "Address", "Institute", "Course","Email" ];
    // const csvParser = new CsvParser({ csvFields });
    // const csvData =await csvParser.parse(students);
    // res.setHeader("Content-Type", "text/csv");
    // res.setHeader(
    //   "Content-Disposition",
    //   "attatchment:filename=studentData.csv"
    // );
    res.status(200).send(studentData);
  } catch (err) {
    res.status(400).json({ status: "error", msg: err.message });
  }
};

