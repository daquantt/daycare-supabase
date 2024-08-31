import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [arrival, setArrival] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [napStart, setNapStart] = useState(null);
  const [napEnd, setNapEnd] = useState(null);
  const [mood, setMood] = useState("");
  const [totalAttendanceTime, setTotalAttendanceTime] = useState(null);
  const [totalNapTime, setTotalNapTime] = useState(null);

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
      const studentData = students.find((student) => student.id === Number(selectStudentValue));
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
  };

  return (
    <section className="container col-xl-8 mt-4 pb-4">
      <h3 className="text-center fs-3 mb-4">Create Student Attendance</h3>

      <form onSubmit={submitForm}>
        <div className="row mb-2">
          <div className="form-group row col-md-6 px-0 mx-auto">
            <label htmlFor="studentId" className="col-md-4 col-form-label">
              Student:
            </label>
            <div className="col-md-8">
              <select id="studentId" className="form-select" value={selectStudentValue} onChange={(e) => setSelectStudentValue(e.target.value)}>
                <option value="">Select student</option>
                {studentList}
              </select>
            </div>
          </div>
          <div className="form-group row col-md-6 px-0 mx-auto">
            <label htmlFor="date" className="col-md-4 col-form-label">
              Date:
            </label>
            <div className="col-md-8 pe-md-0">
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
        </div>

        <div className="row mb-4">
          <div className="form-group row col-6 px-0 mx-auto">
            <label htmlFor="studentId" className="col-md-4 col-form-label">
              ID:
            </label>
            <div className="col-md-8">
              <input type="text" className="form-control" disabled name="studentId" id="studentId" value={student && student.id} />
            </div>
          </div>
          <div className="form-group row col-6 px-0 mx-auto">
            <label htmlFor="classroom" className="col-md-4 col-form-label">
              Classroom:
            </label>
            <div className="col-md-8 pe-md-0">
              <input type="text" className="form-control" disabled name="classroom" id="classroom" value={student && student.classroom} />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="form-group row col col-md-4 px-0 mx-auto">
            <label htmlFor="arrival" className="col-md-5 col-form-label">
              Arrival:
            </label>
            <div className="col-md-7">
              <input
                type="time"
                className="form-control"
                name="arrival"
                id="arrival"
                autoComplete="on"
                value={arrival || ""}
                onChange={(e) => setArrival(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row col col-md-4 px-0 mx-auto">
            <label htmlFor="departure" className="col-md-5 col-form-label">
              Departure:
            </label>
            <div className="col-md-7">
              <input
                type="time"
                className="form-control"
                name="departure"
                id="departure"
                autoComplete="on"
                value={departure || ""}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>
          </div>
          <p className="col-12 col-md-4 my-1">Total Time: {totalAttendanceTime}</p>
        </div>

        <div className="row mb-3 mb-md-4">
          <div className="form-group row col col-md-4 px-0 mx-auto">
            <label htmlFor="napStart" className="col-md-5 col-form-label">
              Nap Start:
            </label>
            <div className="col-md-7">
              <input
                type="time"
                className="form-control"
                name="napStart"
                id="napStart"
                autoComplete="on"
                value={napStart || ""}
                onChange={(e) => setNapStart(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row col col-md-4 px-0 mx-auto">
            <label htmlFor="napEnd" className="col-md-5 col-form-label">
              Nap End:
            </label>
            <div className="col-md-7">
              <input
                type="time"
                className="form-control"
                name="napEnd"
                id="napEnd"
                autoComplete="on"
                value={napEnd || ""}
                onChange={(e) => setNapEnd(e.target.value)}
              />
            </div>
          </div>
          <p className="col-12 col-md-4 my-1">Total Time: {totalNapTime}</p>
        </div>

        <div className="form-group row col-md-6 mb-5">
          <label htmlFor="mood" className="col-md-4 col-form-label">
            Today I was:
          </label>
          <div className="col-md-8 pe-md-0">
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

        <button id="inputSubmitBtn" type="submit" className="btn btn-success d-block mx-auto px-5 fs-5">
          Create
        </button>
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
