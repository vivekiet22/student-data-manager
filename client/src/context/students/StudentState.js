import { useState } from "react";
import StudentContext from "./studentContext";

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
  const studentInitial = [];
  // const url = "http://localhost:5000";
  const [students, setStudents] = useState(studentInitial);
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
        // "Content-Disposition":"attatchment","filename":"studentData.csv",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const student = await response.json();
    const csv =await jsonDownload(student)
    await window.open("data:text/csv;charset=utf-8," + escape(csv))

    console.log(student);
    // res.send({msg:"success"})
    // setStudents(students.concat(student))
  };

  // import from a csv file
  const importStudent = async () => {
    // API call
    const response = await fetch(`/api/dashboard/importStudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    const student = await response.json();
    console.log(student);
    // getSt
    setStudents(students.concat(student));
  };

  return (
    <StudentContext.Provider
      value={{ students, getStudents, exportStudent, importStudent }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};
export default StudentState;
