import React, { useState, useEffect } from "react";
import { fetchStudents } from "../api/studentApi";
import { fetchClassroomAttendance, fetchStudentAttendance } from "../api/attendanceApi";
import moment from "moment";
import { timeCalculator } from "../components/TimeCalculator";

const ClassHoursReportPage = () => {
  const [selectClassValue, setSelectClassValue] = useState();
  const [selectMonthValue, setSelectMonthValue] = useState(moment().month());
  const [selectYearValue, setSelectYearValue] = useState(moment().year());
  const [students, setStudents] = useState([]);
  const [classroomAttendance, setClassroomAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [classStudents, setClassStudents] = useState("");

  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
  }, []);

  //get students in class based on selection from dropdown
  useEffect(() => {
    // get students data from student db
    const getClassStudents = () => {
      const studentData = students.filter((student) => student.classroom === selectClassValue);
      setClassStudents(studentData);
    };

    //get all students attendance from attendance db based on classroom selected
    const getClassAttendance = async () => {
      setLoading(true);
      try {
        const StudentData = await fetchClassroomAttendance(selectClassValue);
        setClassroomAttendance(StudentData);
      } catch (error) {
        setError(error);
        console.log(error);
      }
      setLoading(false);
    };

    getClassStudents();
    getClassAttendance();
  }, [selectClassValue]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Something went wrong. Please try again...</div>;
  }

  //for each student, get all attendance, calculate total hours
  const showStudents = () =>
    classStudents.map((student) => {
      // filter on dates within current month
      let currentMonthAttendance = classroomAttendance.filter(
        (attendance) =>
          attendance.studentId === student.id &&
          moment(attendance.date).month() === Number(selectMonthValue) &&
          moment(attendance.date).year() === Number(selectYearValue)
      );

      let times = [];
      currentMonthAttendance.forEach((item) => {
        //calculate duration and push to times array
        let time = moment.duration(item.departure, "HH:mm").subtract(moment.duration(item.arrival, "HH:mm"));
        times.push(time);
      });
      // console.log(times);

      //add all times using reduce method
      let totalTime = times.reduce((acc, time) => acc.add(moment.duration(time)), moment.duration());

      //if totalTime = 0, return nothing
      if (moment.duration(totalTime).asMilliseconds() === 0) {
        return;
      }

      return (
        <tr key={student.id}>
          <td>
            {student.firstName} {student.lastName}
          </td>
          <td>{student.id}</td>
          <td>{month[selectMonthValue]}</td>
          <td>
            {Math.floor(totalTime.asHours())}h {totalTime.minutes()}m
          </td>
        </tr>
      );
    });

  return (
    <section className="container mt-4">
      <h2 className="text-center mb-4">Monthly Hours Report by Class</h2>

      <div className="d-lg-flex justify-content-between align-items-center mb-4">
        <div className="d-flex mb-2 me-5">
          <label htmlFor="classroom" className="col-form-label me-3">
            Classroom:
          </label>
          <div>
            <select id="classroom" className="form-select" value={selectClassValue} onChange={(e) => setSelectClassValue(e.target.value)}>
              <option value="">Select classroom</option>
              <option value="Amber">Amber</option>
              <option value="Ruby">Ruby</option>
              <option value="Pearl">Pearl</option>
            </select>
          </div>
        </div>
        <div className="d-flex mb-2 me-5">
          <label htmlFor="month" className="col-form-label me-3">
            Month:
          </label>
          <div>
            <select id="month" className="form-select" value={selectMonthValue} onChange={(e) => setSelectMonthValue(e.target.value)}>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </div>
        </div>
        <div className="d-flex mb-2 me-5">
          <label htmlFor="year" className="col-form-label me-3">
            Year:
          </label>
          <div>
            <select id="year" className="form-select" value={selectYearValue} onChange={(e) => setSelectYearValue(e.target.value)}>
              <option value="">Select year</option>
              <option value={moment().year()}>{moment().year()}</option>
              <option value={moment().year() - 1}>{moment().year() - 1}</option>
              <option value={moment().year() - 2}>{moment().year() - 2}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-3 mb-4 border border-secondary-subtle rounded-3">
        <div className="table-responsive">
          <table className="table table-sm table-dark">
            <thead>
              <tr>
                <th scope="col" className="fw-bold">
                  Name
                </th>
                <th scope="col" className="fw-bold">
                  ID
                </th>
                <th scope="col" className="fw-bold">
                  Month
                </th>
                <th scope="col" className="fw-bold">
                  Total Hours
                </th>
              </tr>
            </thead>
            <tbody id="" className="table-group-divider">
              {classStudents && classStudents.length > 0 ? (
                showStudents()
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Select a classroom
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ClassHoursReportPage;
