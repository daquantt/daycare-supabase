import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchStudents } from "../api/studentApi";
import { addStudentToClass, fetchTodayStudents } from "../api/attendanceApi";
import { toast } from "react-toastify";
import dateFormat, { masks } from "dateformat";

const ClassList = (prop) => {
  const { classroom } = prop;

  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [classroomName, setClassroomName] = useState("");
  const [todayStudents, setTodayStudents] = useState([]);
  const [studentsInClassToday, setStudentsInClassToday] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    const getStudent = async () => {
      const res = await fetch(`/api/students?id=${selectValue}`);
      const student = await res.json();
      setStudentData(student);
    };
    getStudent();
  }, [selectValue]);

  useEffect(() => {
    const getTodayStudents = async () => {
      setLoading(true);
      try {
        const StudentData = await fetchTodayStudents();
        setTodayStudents(StudentData);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getTodayStudents();
  }, [classroomName, reload]);
  // console.log(todayStudents);

  useEffect(() => {
    setStudentsInClassToday(todayStudents.filter((student) => student.classroom === classroomName));
  }, [todayStudents, reload]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Something went wrong. Please try again...</div>;
  }

  //list student in the class
  const classStudents = students.filter((student) => student.classroom === classroomName && student.status === "Y");
  //list students in class on todays date
  const today = new Date().toLocaleDateString();
  const todayAsString = dateFormat(today, "yyyy-mm-dd");

  const nameList = classStudents.map((student) => (
    <option key={student.id} value={student.id}>
      {student.firstName} {student.lastName}
    </option>
  ));

  function addStudentToAttendance(event) {
    event.preventDefault();

    if (selectValue === "") {
      toast.error("Please select a student");
      return;
    }
    // if student in class already, notify user and return
    const isStudentPresent = () => {
      const idArray = Array.from(studentsInClassToday, (item) => item.studentId);
      console.log(idArray);
      if (idArray.includes(selectValue)) {
        return true;
      } else return false;
    };

    if (isStudentPresent()) {
      toast.error(`${studentData[0].firstName} is already in class`);
      return;
    }

    const student = {
      studentId: selectValue,
      date: todayAsString,
      firstName: studentData[0].firstName,
      lastName: studentData[0].lastName,
      classroom: studentData[0].classroom,
    };
    addStudentToClass(student);
    toast.success(`${studentData[0].firstName} was added to the class`);
    setReload(!reload);
  }

  return (
    <section className="w-75 mx-auto p-4 border border-light rounded">
      <div className="d-flex justify-content-between align-items-end mb-2">
        <h3 className="text-center">Class Attendance </h3>
        <p className="fs-5 mb-2">Date: {todayAsString}</p>
      </div>
      <form onSubmit={addStudentToAttendance}>
        <div className="input-group w-50 ms-auto mb-4">
          <select className="form-select" id="" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
            <option value="">Select student</option>
            {nameList}
          </select>
          <button className="btn btn-primary" type="submit">
            Add Student
          </button>
        </div>
      </form>
      <ul id="classListing" className="d-flex justify-content-between p-0 mb-0">
        {studentsInClassToday.map((student) => {
          return (
            <li key={student.id}>
              {student.firstName} {student.lastName}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ClassList;
