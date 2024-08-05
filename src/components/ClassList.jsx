import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStudents } from "../api/studentApi";

const ClassList = (prop) => {
  const { sendToParent, classroom } = prop;

  const [students, setStudents] = useState([]);
  const [classroomName, setClassroomName] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getStudents = async () => {
      setLoading(true);
      try {
        const StudentData = await fetchStudents();
        setStudents(StudentData);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getStudents();
    setClassroomName(classroom);
  }, [classroom]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Something went wrong. Please try again...</div>;
  }

  //list student in the class
  const classStudents = students.filter((student) => student.classroom === classroomName);
  //list students in class on todays date
  const todayAsString = new Date().toJSON().slice(0, 10);
  const todayStudents = classStudents.filter((student) => student.attendance?.some((item) => item.date === todayAsString));
  // console.log(todayAsString);

  const nameList = classStudents.map((student) => (
    <option key={student.id} value={student.id}>
      {student.firstName} {student.lastName}
    </option>
  ));

  function addStudentToAttendance(event) {
    event.preventDefault();
    // console.log(selectValue);

    // const editStudent = {
    //   id: selectValue,
    //   attendance: todayAsString,
    // };
    // sendToParent1(editStudent);
    sendToParent(selectValue);
  }

  return (
    <section className="w-75 mx-auto p-4 border border-light rounded">
      <div className="d-flex justify-content-between align-items-end mb-2">
        <h3 className="text-center">Class Attendance </h3>
        <p className="fs-5 mb-2">Date: {new Date().toJSON().slice(0, 10)}</p>
      </div>
      <form onSubmit={addStudentToAttendance}>
        <div className="input-group w-50 ms-auto mb-4">
          <select className="form-select" id="" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
            <option value="blue">Select student</option>
            {nameList}
          </select>
          <button className="btn btn-primary" type="submit">
            Add Student
          </button>
        </div>
      </form>
      <ul id="classListing" className="d-flex justify-content-between p-0 mb-0">
        {todayStudents.map((student) => (
          <li key={student.id}>
            {student.firstName} {student.lastName}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ClassList;
