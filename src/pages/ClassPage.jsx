import React, { useEffect, useState } from "react";
import { fetchStudents } from "../api/studentApi";
import { addStudentToClass, fetchTodayStudents } from "../api/attendanceApi";
import { toast } from "react-toastify";
import dateFormat from "dateformat";
import { Link, useLoaderData } from "react-router-dom";

const ClassPage = () => {
  const classroom = useLoaderData();

  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [classroomName, setClassroomName] = useState(classroom.name);
  const [todayStudents, setTodayStudents] = useState([]);
  const [studentsInClassToday, setStudentsInClassToday] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [reload, setReload] = useState(false);

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
    // setClassroomName(classroom);
  }, []);

  //get student data for attendance to class
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
      mood: "",
      arrival: "",
      departure: "",
      napStart: "",
      napEnd: "",
    };
    addStudentToClass(student);
    toast.success(`${studentData[0].firstName} was added to the class`);
    setReload(!reload);
  }

  return (
    <section className="w-75 mt-3 mx-auto p-4 ">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="">{classroomName} Class Attendance</h3>
        <Link to={"/"} className="btn btn-secondary">
          Back
        </Link>
      </div>
      <p className="fs-5 pb-3 mb-4 border-bottom">{dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM TT")}</p>
      <form onSubmit={addStudentToAttendance} className="col-md-8 col-lg-6 ms-auto mb-4">
        <div className="input-group ms-auto">
          <select className="form-select" id="searchBar" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
            <option value="">Select student</option>
            {nameList}
          </select>
          <button className="btn btn-primary" type="submit">
            Add to Attendance
          </button>
        </div>
      </form>
      <ul id="classListing" className="d-flex justify-content-between gap-2 p-0 mb-0">
        {studentsInClassToday.map((attendance) => {
          return (
            <Link key={attendance.id} to={`/day-report/${attendance.id}`} type="button" className="btn btn-outline-primary">
              <li>
                {attendance.firstName} {attendance.lastName}
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default ClassPage;
