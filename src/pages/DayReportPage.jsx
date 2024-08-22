import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import { dateFormatter, timeFormatter } from "../components/DateFormatter";
import { timeCalculator } from "../components/TimeCalculator";

const DayReportPage = () => {
  const attendance = useLoaderData();
  const { id, studentId, date, firstName, lastName, classroom, arrival, departure, napStart, napEnd, mood } = attendance;

  const navigate = useNavigate();

  let classId;
  if (classroom === "Amber") {
    classId = "1";
  } else if (classroom === "Ruby") {
    classId = "2";
  } else if (classroom === "Pearl") {
    classId = "3";
  }

  return (
    <section className="container my-4">
      <h3 className="text-center fs-3">Student Daily Report</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="fs-2 fw-bold mb-0">
          {firstName} {lastName}
        </p>
        <div>
          <Link to={`/edit-day-report/${id}`} className="btn btn-primary">
            Update
          </Link>
          <Link to={`/students/${studentId}`} className="btn btn-primary ms-3">
            View Student Details
          </Link>
          <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary ms-3">
            Return
          </button>
        </div>
      </div>
      <p className="fs-5 mb-2">Date: {dateFormatter(date)}</p>
      <p className="me-5">Today I was: {mood}</p>
      <div className="row">
        <div className="col-lg-6">
          <h4>Attendance Time</h4>
          <div className="d-flex p-3 mb-4 border rounded">
            <p className="mb-0 me-4">In: {timeFormatter(arrival)}</p>
            <p className="mb-0 me-4">Out: {timeFormatter(departure)}</p>
            <p className="mb-0">Total Time: {timeCalculator(arrival, departure)}</p>
          </div>
        </div>
        <div className="col-lg-6">
          <h4>Nap Time</h4>
          <div className="d-flex p-3 mb-4 border rounded">
            <p className="mb-0 me-4">Start: {timeFormatter(napStart)}</p>
            <p className="mb-0 me-4">End: {timeFormatter(napEnd)}</p>
            <p className="mb-0">Total Time: {timeCalculator(napStart, napEnd)}</p>
          </div>
        </div>
      </div>

      <section className="mt-2">
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

export default DayReportPage;
