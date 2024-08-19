import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import dateFormat from "dateformat";
import { dateFormatter, timeFormatter } from "../components/DateFormatter";

const DayReportPage = () => {
  const attendance = useLoaderData();

  return (
    <section className="container my-4">
      <h3 className="text-center fs-3">Student Daily Report</h3>
      <div className="d-flex justify-content-between align-items-end mb-3">
        <p className="fs-2 fw-bold mb-0">
          {attendance.firstName} {attendance.lastName}
        </p>
        <div>
          <Link to={`/edit-day-report/${attendance.id}`} className="btn btn-primary">
            Update
          </Link>
          <Link to={`/students/${attendance.studentId}`} className="btn btn-primary ms-3">
            View Student Details
          </Link>
        </div>
      </div>
      <p className="fs-5 mb-2">Date: {dateFormatter(attendance.date)}</p>
      <div className="d-flex">
        <p className="me-5">Arrival: {timeFormatter(attendance.arrival)}</p>
        <p className="me-5">Departure: {timeFormatter(attendance.departure)}</p>
        <p>Total Hours: 3.5</p>
      </div>
      <div className="d-flex">
        <p className="me-5">
          Nap Time: {timeFormatter(attendance.napStart)} to {timeFormatter(attendance.napEnd)}
        </p>
        <p>Hours: 2.25</p>
      </div>
      <p className="me-5">Today I was: {attendance.mood}</p>

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

export default DayReportPage;
