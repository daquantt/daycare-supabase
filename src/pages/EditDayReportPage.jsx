import { useState } from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { updateAttendance } from "../api/attendanceApi";
import { toast } from "react-toastify";
import dateFormat from "dateformat";
import { dateFormatter } from "../components/DateFormatter";

const EditDayReportPage = () => {
  const studentAttendance = useLoaderData();

  const [studentId, setStudentId] = useState(studentAttendance.studentId);
  const [date, setDate] = useState(studentAttendance.date);
  const [firstName, setFirstName] = useState(studentAttendance.firstName);
  const [lastName, setLastName] = useState(studentAttendance.lastName);
  const [classroom, setClassroom] = useState(studentAttendance.classroom);
  const [arrival, setArrival] = useState(studentAttendance.arrival);
  const [departure, setDeparture] = useState(studentAttendance.departure);
  const [napStart, setNapStart] = useState(studentAttendance.napStart);
  const [napEnd, setNapEnd] = useState(studentAttendance.napEnd);
  const [mood, setMood] = useState(studentAttendance.mood);

  const navigate = useNavigate();
  const { id } = useParams();

  const submitForm = (event) => {
    event.preventDefault();

    const editAttendance = {
      id,
      arrival,
      departure,
      napStart,
      napEnd,
      mood,
    };

    updateAttendance(editAttendance);
    toast.success(`${firstName} was updated`);
    return navigate(`/day-report/${id}`);
  };

  return (
    <section className="container my-4">
      <h3 className="text-center fs-3">Update Student Daily Report</h3>
      <div className="d-flex justify-content-between align-items-end mb-3">
        <p className="fs-2 fw-bold mb-0">
          {firstName} {lastName}
        </p>
        <p className="fs-5 mb-2">Date: {dateFormatter(date)}</p>
      </div>
      <form onSubmit={submitForm}>
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
          <p className="w-50">Total Hours: 3.5</p>
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
          <p className="w-50">Hours: 2.25</p>
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
          Update
        </button>

        <Link to={`/day-report/${studentAttendance.id}`} type="button" className="btn btn-secondary mt-3 px-4 fs-5">
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

export default EditDayReportPage;
