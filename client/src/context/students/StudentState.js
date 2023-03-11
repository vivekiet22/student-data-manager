import { useState } from "react";
import StudentContext from "./studentContext";

const StudentState = (props) => {
  const host = "http://localhost:5000"
  const studentInitial = []
  const [students, setStudents] = useState(studentInitial)
  // Get all Students
  const getStudents =async () => {
    // :api call
    const response = await fetch(`${host}/dashboard/fetch`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    // console.log(json)
    setStudents(json.students)
  }



  // Export CSV 
  const exportStudent =async () => {
    // api call
    const response = await fetch(`${host}/dashboard/exportStudent`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        // "Content-Disposition":"attatchment","filename":"studentData.csv",
        // "x-auth-token": localStorage.getItem('token')

      }
    });
    const student = await response.json();
    console.log(student)
    // setStudents(students.concat(student))
  }


  // import from a csv file
  const importStudent =async () => {
    // API call
    const response = await fetch(`${host}/dashboard/importStudent`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem('token')
      }
    });
   
    const student = await response.json();
    console.log(student)
    // getSt
    setStudents(students.concat(student))

  }





  return (
    <StudentContext.Provider value={{students, getStudents, exportStudent, importStudent }}>
      {props.children}
    </StudentContext.Provider>
  )
}
export default StudentState;