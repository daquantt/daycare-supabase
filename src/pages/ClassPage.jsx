import React, { useEffect, useState } from "react";
import { fetchStudentsInClass } from "../api/studentApi";
import { addStudentToClass, fetchTodayStudents } from "../api/attendanceApi";
import { toast } from "react-toastify";
import dateFormat from "dateformat";
import { Link, useLoaderData } from "react-router-dom";
import { supabase } from "../supabaseClient";

const ClassPage = () => {
  const classroom = useLoaderData();

  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [classroomName, setClassroomName] = useState(classroom.name);
  const [classroomColor, setClassroomColor] = useState(classroom.color);
  const [todayStudents, setTodayStudents] = useState([]);
  const [studentsInClassToday, setStudentsInClassToday] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [reload, setReload] = useState(false);

  const today = new Date().toLocaleDateString();
  const todayAsString = dateFormat(today, "yyyy-mm-dd");

  useEffect(() => {
    const getStudentsInClass = async () => {
      setLoading(true);
      try {
        const StudentData = await fetchStudentsInClass(classroomName);
        setStudents(StudentData);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getStudentsInClass();
  }, []);

  //get student data for attendance to class
  useEffect(() => {
    const getStudent = async () => {
      const { data, error } = await supabase.from("students").select().eq("id", selectValue);
      setStudentData(data);
    };
    getStudent();
  }, [selectValue]);

  useEffect(() => {
    const getTodayStudents = async () => {
      setLoading(true);
      try {
        const StudentData = await fetchTodayStudents(today);
        setTodayStudents(StudentData);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getTodayStudents();
  }, [reload]);
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

  //list active students in the class
  const classStudents = students.filter((student) => student.active === "Y");

  //list students in class on todays date for dropdown
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
      if (idArray.includes(Number(selectValue))) {
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
      arrival: null,
      departure: null,
      napStart: null,
      napEnd: null,
    };

    addStudentToClass(student);
    setSelectValue("");
    setReload(!reload);
  }

  return (
    <section className="container col-lg-8 mt-3 pb-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="">{classroomName} Class Attendance</h3>
        <Link to={"/"} className="btn btn-secondary">
          Back
        </Link>
      </div>
      <p className="fs-5 pb-3 mb-4 border-bottom">{todayAsString}</p>
      {/* <p className="fs-5 pb-3 mb-4 border-bottom">{dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM TT")}</p> */}
      <form onSubmit={addStudentToAttendance} className="col-sm-8 col-lg-6 ms-auto mb-4">
        <div className="input-group ms-auto">
          <select className="form-select" id="searchBar" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
            <option value="">Select student</option>
            {nameList}
          </select>
          <button className={`btn btn-outline-${classroomColor}`} type="submit">
            Add to Attendance
          </button>
        </div>
      </form>
      <ul id="classListing" className="d-flex justify-content-between gap-2 p-0 mb-0">
        {studentsInClassToday.map((attendance) => {
          return (
            <Link key={attendance.id} to={`/day-report/${attendance.id}`} type="button" className={`btn btn-${classroomColor}`}>
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
