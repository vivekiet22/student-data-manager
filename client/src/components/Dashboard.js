import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import studentContext from "../context/students/studentContext";
import Papa from "papaparse"
const Dashboard = (props) => {
  const context = useContext(studentContext);
  const { students,jsonOutput,setJsonOutput, getStudents, exportStudent, importStudent } = context;
  const [csvFile, setCsvFile] = useState(null);
 
  const handleFileUpload = (event) => {
    importStudent(event).then(()=>{getStudents()});
    
  };

  const handleFileConversion =async () => {
    const fileReader = new FileReader();
    fileReader.onload =async (event) => {
      const csvData = event.target.result;
      const json = Papa.parse(csvData, { header: true });
      await setJsonOutput(JSON.stringify(json.data));
      console.log("dashboard",jsonOutput)
      
    };
  
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getStudents();
    } else {
      navigate("/login");
    }
  }, []);
  
  const handleExport = () => {
    exportStudent();
  };

  return (
    <>
      <div className="dashboard">
        <div className="main-header">
          <div className="main-header-h1">
            <h1 className="header-h">Student</h1>
            <span className="main-header-p">
              List of all the students in the database
            </span>
          </div>
          <div className="main-header-right">
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <button onClick={handleFileConversion} disabled={!csvFile}>
              Convert
            </button>
          </div>
          <button onClick={handleExport}>Export as CSV</button>
        </div>
        {students.length > 0 ? (
          <table className="table-main">
            <tbody>
              <tr className="table-header">
                <th>Name</th>
                <th>Roll No</th>
                <th>Address</th>
                <th>Institute</th>
                <th>Course</th>
              </tr>
              {students.map((student) => {
                return (
                  <tr>
                    <td>{student.name} </td>
                    <td>{student.rollNo} </td>
                    <td> {student.address}</td>
                    <td>{student.institute} </td>
                    <td>{student.course} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          "No data"
        )}
      </div>
    </>
  );
};

export default Dashboard;
