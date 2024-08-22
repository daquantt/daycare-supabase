import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addStudentToClass, fetchStudentAttendance } from "../api/attendanceApi";
import { toast } from "react-toastify";
import { fetchStudents } from "../api/studentApi";
import { timeCalculator } from "../components/TimeCalculator";

const CreateAttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [student, setStudent] = useState("");
  const [selectStudentValue, setSelectStudentValue] = useState("");
  const [studentAttendance, setStudentAttendance] = useState("");
  const [date, setDate] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [napStart, setNapStart] = useState("");
  const [napEnd, setNapEnd] = useState("");
  const [mood, setMood] = useState("");
  const [totalAttendanceTime, setTotalAttendanceTime] = useState("");
  const [totalNapTime, setTotalNapTime] = useState("");

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

  //to update time calculation when input changes
  useEffect(() => {
    const updateTime = async () => {
      let time = timeCalculator(arrival, departure);
      setTotalAttendanceTime(time);
      let time2 = timeCalculator(napStart, napEnd);
      setTotalNapTime(time2);
    };

    updateTime();
  }, [arrival, departure, napEnd, napStart]);

  // console.log(studentAttendance);
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

  const submitForm = (event) => {
    event.preventDefault();

    if (selectStudentValue === "") {
      toast.error("Please select a student");
      return;
    }

    // if student in class already, notify user and return
    //find matching date in studentAttendance
    let match = studentAttendance.find((attendance) => attendance.date === date);
    if (match) {
      toast.error(student.firstName + " has an entry for this date");
      return;
    }

    const manualAttendance = {
      studentId: student.id,
      date,
      firstName: student.firstName,
      lastName: student.lastName,
      classroom: student.classroom,
      arrival,
      departure,
      napStart,
      napEnd,
      mood,
    };

    addStudentToClass(manualAttendance);
    toast.success(`${student.firstName} was created`);
  };

  return (
    <section className="container my-4">
      <h3 className="text-center fs-3 mb-4">Create Student Attendance</h3>

      <form onSubmit={submitForm}>
        <div className="form-group row mb-2">
          <label htmlFor="date" className="col-md-2 col-form-label text-md-right">
            Date:
          </label>
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              name="date"
              id="date"
              required
              autoComplete="on"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="studentId" className="col-md-2 col-form-label">
            Student:
          </label>
          <div className="col-md-4">
            <select id="studentId" className="form-select" value={selectStudentValue} onChange={(e) => setSelectStudentValue(e.target.value)}>
              <option value="">Select student</option>
              {studentList}
            </select>
          </div>
          <div className="col-md-5 d-flex justify-content-between align-items-center">
            <p className="my-auto w-50">Student ID: {student && student.id}</p>
            <p className="my-auto w-50">Class: {student && student.classroom}</p>
          </div>
        </div>

        <div className="d-flex mb-2">
          <div className="form-group row me-4 w-100">
            <label htmlFor="arrival" className="col-md-5 col-form-label text-md-right">
              Arrival:
            </label>
            <div className="col-md-7">
              <input
                type="time"
                className="form-control"
                name="arrival"
                id="arrival"
                autoComplete="on"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row me-4 w-100">
            <label htmlFor="departure" className="col-md-5 col-form-label text-md-right">
              Departure:
            </label>
            <div className="col-md-7">
              <input
                type="time"
                className="form-control"
                name="departure"
                id="departure"
                autoComplete="on"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>
          </div>
          <p className="w-50 mb-0 mt-1">Total Time: {totalAttendanceTime}</p>
        </div>

        <div className="d-flex mb-2">
          <div className="form-group row me-4 w-100">
            <label htmlFor="napStart" className="col-md-5 col-form-label text-md-right">
              Nap Start:
            </label>
            <div className="col-md-7">
              <input
                type="time"
                className="form-control"
                name="napStart"
                id="napStart"
                autoComplete="on"
                value={napStart}
                onChange={(e) => setNapStart(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row me-4 w-100">
            <label htmlFor="napEnd" className="col-md-5 col-form-label text-md-right">
              Nap End:
            </label>
            <div className="col-md-7">
              <input
                type="time"
                className="form-control"
                name="napEnd"
                id="napEnd"
                autoComplete="on"
                value={napEnd}
                onChange={(e) => setNapEnd(e.target.value)}
              />
            </div>
          </div>
          <p className="w-50 mb-0 mt-1">Hours: {timeCalculator(napStart, napEnd)}</p>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="mood" className="col-md-2 col-form-label text-md-right">
            Today I was:
          </label>
          <div className="col-md-3">
            <select id="mood" className="form-select" value={mood} onChange={(e) => setMood(e.target.value)}>
              <option value="">Select option</option>
              <option value="Happy">Happy</option>
              <option value="Grumpy">Grumpy</option>
              <option value="Tired">Tired</option>
              <option value="Sad">Sad</option>
              <option value="Sleepy">Sleepy</option>
              <option value="Curious">Curious</option>
            </select>
          </div>
        </div>

        <button id="inputSubmitBtn" type="submit" className="btn btn-success mt-3 me-3 px-4 fs-5">
          Create
        </button>

        <Link to={""} type="button" className="btn btn-secondary mt-3 px-4 fs-5">
          Return
        </Link>
      </form>

      <section className="mt-4">
        <h4>Food</h4>
        <div className="container p-3 mb-4 border border-secondary-subtle rounded-3">
          <div className="table-responsive">
            <table className="table table-sm table-dark">
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Type</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody id="" className="table-group-divider"></tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <h4>Diaper</h4>
        <div className="container p-3 mb-4 border border-secondary-subtle rounded-3">
          <div className="table-responsive">
            <table className="table table-sm table-dark">
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Type</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody id="" className="table-group-divider"></tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CreateAttendancePage;
