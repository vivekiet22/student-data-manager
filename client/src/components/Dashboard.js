import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import studentContext from "../context/students/studentContext";

const Dashboard = (props) => {
  const context = useContext(studentContext);
  const { students, getStudents, exportStudent, importStudent } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getStudents();
    } else {
      navigate("/login");
    }
  }, []);
  const handleImport = () => {
    importStudent();
  };
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
            <form method="post" enctype="multipart/form-data">
              <input
                className="right"
                type="file"
                onChange={handleImport}
                name="file"
              />

              <button className="right" type="submit">
                Import Students
              </button>
            </form>
            <button onClick={handleExport}>Export as CSV</button>
          </div>
        </div>
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
      </div>
    </>
  );
};

export default Dashboard;
