import { Link } from "react-router-dom";

const DayReport = ({ student }) => {
  const { firstName, lastName } = student;
  return (
    <section>
      <h3 className="text-center fs-3">Student Daily Report</h3>
      <div className="d-flex justify-content-between align-items-end mb-3">
        <p className="fs-2 fw-bold mb-0">
          {firstName} {lastName}
          <Link to={`/students/${student.id}`} className="btn btn-primary ms-3">
            Student Details
          </Link>
        </p>
        <p className="mb-2">Date: July 27, 2024</p>
      </div>
      <div className="d-flex">
        <p className="me-5">Arrival: 10:00 am</p>
        <p className="me-5">Departure: 3:25 pm</p>
        <p>Total Hours: 3.5</p>
      </div>
      <div className="d-flex">
        <p className="me-5">Nap Time: 11:45 am to 2:30 pm</p>
        <p>Hours: 2.25</p>
      </div>
      <p className="me-5">Today I was: Happy/Sad/Sleepy/Grumpy/Curious/Tired</p>

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

export default DayReport;
