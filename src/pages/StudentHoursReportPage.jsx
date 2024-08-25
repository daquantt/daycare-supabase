import React, { useState, useEffect } from "react";
import { fetchStudents } from "../api/studentApi";
import { fetchStudentAttendance } from "../api/attendanceApi";
import moment from "moment";
import { timeCalculator } from "../components/TimeCalculator";

const StudentHoursReportPage = () => {
  const [selectStudentValue, setSelectStudentValue] = useState();
  const [students, setStudents] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [student, setStudent] = useState("");

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

  //find student based on selection from dropdown
  useEffect(() => {
    //get student data from student db
    const getStudent = () => {
      const studentData = students.find((student) => student.id === selectStudentValue);
      setStudent(studentData);
    };

    //get all of 1 student attendance from attendance db
    const getStudentAttendance = async () => {
      setLoading(true);
      try {
        const StudentData = await fetchStudentAttendance(selectStudentValue);
        setStudentAttendance(StudentData);
      } catch (error) {
        setError(error);
        console.log(error);
      }
      setLoading(false);
    };

    getStudent();
    getStudentAttendance();
  }, [selectStudentValue]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Something went wrong. Please try again...</div>;
  }

  //active student list for dropdown
  const studentList = students
    .filter((student) => student.active === "Y")
    .map((student) => (
      <option key={student.id} value={student.id}>
        {student.firstName} {student.lastName}
      </option>
    ));

  //get last 12 months
  let previous12Months = [];
  for (let i = 0; i < 12; i++) {
    const now = new Date();
    let previousMonth = now.setMonth(now.getMonth() - i);
    previous12Months.push(previousMonth);
  }
  console.log(previous12Months);

  //func to calculate total hours for the month
  const showMonths = () =>
    previous12Months.map((month) => {
      //filter on dates within current month
      let currentMonthAttendance = studentAttendance.filter(
        (attendance) =>
          moment(attendance.date).month() === new Date(month).getMonth() && moment(attendance.date).year() === new Date(month).getFullYear()
      );
      console.log(currentMonthAttendance);

      let times = [];
      currentMonthAttendance.forEach((item) => {
        //calculate duration and push to times array
        let time = moment.duration(item.departure, "HH:mm").subtract(moment.duration(item.arrival, "HH:mm"));
        times.push(time);
      });
      console.log(times);

      //add all times using reduce method
      let totalTime = times.reduce((acc, time) => acc.add(moment.duration(time)), moment.duration());

      return (
        <tr>
          <td>
            {months[new Date(month).getMonth()]} {new Date(month).getFullYear()}
          </td>
          <td>
            {Math.floor(totalTime.asHours())}h {totalTime.minutes()}m
          </td>
        </tr>
      );
    });

  return (
    <section className="container mt-4">
      <h2 className="text-center mb-4">Monthly Hours Report by Student</h2>

      <div className="d-lg-flex justify-content-between align-items-center mb-4">
        <div className="d-flex mb-2 me-5">
          <label htmlFor="student" className="col-form-label me-3">
            Student:
          </label>
          <div className="">
            <select id="student" className="form-select" value={selectStudentValue} onChange={(e) => setSelectStudentValue(e.target.value)}>
              <option value="">Select student</option>
              {studentList}
            </select>
          </div>
        </div>
        <div className="d-flex mb-2 me-5">
          <label htmlFor="studentId" className="col-form-label me-3">
            Student ID:
          </label>
          <div className="">
            <input type="text" className="form-control" name="studentId" id="studentId" disabled placeholder={student && student.id} />
          </div>
        </div>
        <div className="d-flex mb-2">
          <label htmlFor="classroom" className="col-form-label me-3">
            Class:
          </label>
          <div className="">
            <input type="text" className="form-control" name="classroom" id="classroom" disabled placeholder={student && student.classroom} />
          </div>
        </div>
      </div>

      <div className="p-3 mb-4 border border-secondary-subtle rounded-3">
        <div className="table-responsive">
          <table className="table table-sm table-dark">
            <thead>
              <tr>
                <th scope="col" className="fw-bold">
                  Month
                </th>
                <th scope="col" className="fw-bold">
                  Total Hours
                </th>
              </tr>
            </thead>
            <tbody id="" className="table-group-divider">
              {studentAttendance && studentAttendance.length > 0 ? (
                showMonths()
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No students registered
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

export default StudentHoursReportPage;
