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
    await csv().fromFile(req.file.path).then(async (response)=>{
      
      for (let x = 0;x<response.length;x++){
        userData.push({
          name:response[x].Name,
          rollNo:response[x].Roll_No,
          address:response[x].Address,
          institute:response[x].Institute,
          course:response[x].Course,
          email:response[x].Email,
        })
      }
    })
    
    await Student.insertMany(userData).catch(()=>{});
    res.status(201).json({ status: "success",msg:"File Imported successfully" });
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

