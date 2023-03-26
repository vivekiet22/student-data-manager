import { useState,useEffect } from "react";
import StudentContext from "./studentContext";
import Papa from 'papaparse';
import { sendCsvAsJson,readFile,convertCsvToJson } from "./importFunctions";
const jsonDownload = async (objArray) => {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  let str = "";
  let line = "";

  for (var index in array[0]) {
    line += index + ",";
  }
  line = line.slice(0, -1);
  str += line + "\r\n";

  for (let i = 0; i < array.length; i++) {
    line=''
    for (var index in array[i]) {
      line += array[i][index] + ',';
  }
  line = line.slice(0, -1);
        str += line + '\r\n';
  }
  return str
};





const StudentState = (props) => {

  const [csvFile, setCsvFile] = useState(null);
  const [jsonOutput, setJsonOutput] = useState(null);

  const handleFileConversion = () => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const csvData = event.target.result;
      const json = Papa.parse(csvData, { header: true });
      setJsonOutput(JSON.stringify(json.data));
    };
    fileReader.readAsText(csvFile);
    
  };
  const studentInitial = [];
  // const url = "http://localhost:5000";
  const [students, setStudents] = useState(studentInitial);

  useEffect(() => {
    console.log("gg guys",jsonOutput)
  }, [jsonOutput])
  

  // Get all Students
  const getStudents = async () => {
    // :api call
    const response = await fetch(`/api/dashboard/fetch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json)
    setStudents(json.students);
  };

  // Export CSV
  const exportStudent = async () => {
    
    // api call
    const response = await fetch(`/api/dashboard/exportStudent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      
    });
    const student = await response.json();
    const csv =await jsonDownload(student)
    await window.open("data:text/csv;charset=utf-8," + escape(csv))

    console.log(student);
  };

  // import from a csv file
  const importStudent = async (evt) => {
    // API call
    console.log("import in student state")
    // console.log(evt)
    const file = evt.target.files[0];
    // setCsvFile(file);
    // handleFileConversion()

    // const response = await fetch(`http://localhost:5000/api/dashboard/importStudent`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-auth-token": localStorage.getItem("token"),
    //   },
    //   body: JSON.stringify({jsonOutput})
    
    // });
    const response = await sendCsvAsJson(`/api/dashboard/importStudent`,file)


    // const student = await response.json();
    // console.log(student);
    // // getSt
    // setStudents(students.concat(student));
  };

  return (
    <StudentContext.Provider
      value={{ students,jsonOutput,setJsonOutput, getStudents, exportStudent, importStudent }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};
export default StudentState;
