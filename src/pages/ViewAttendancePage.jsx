import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAttendance } from "../api/attendanceApi";
import { FaEdit } from "react-icons/fa";
import { timeFormatter } from "../components/DateFormatter";

const ViewAttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const getAttendance = async () => {
      setLoading(true);
      try {
        const StudentData = await fetchAttendance();
        setAttendance(StudentData);
        setFilteredStudents(StudentData);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getAttendance();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Something went wrong. Please try again...</div>;
  }

  const showStudents = () =>
    filteredStudents.map((attendance) => {
      return (
        <tr key={attendance.id}>
          <td>{attendance.date}</td>
          <td>
            {attendance.firstName} {attendance.lastName}
          </td>
          <td>{attendance.classroom}</td>
          <td>{timeFormatter(attendance.arrival)}</td>
          <td>{timeFormatter(attendance.departure)}</td>
          <td>
            <Link to={`/edit-day-report/${attendance.id}`}>
              <FaEdit />
            </Link>
          </td>
        </tr>
      );
    });

  //search as input changes
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchValue(searchTerm);
    const filteredItems = attendance.filter(
      (student) =>
        student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.classroom?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filteredItems);
  };

  return (
    <section className="container col-xl-8 mt-4 pb-5">
      <h2>Student Attendance Listing</h2>

      <div className="col-md-6 col-lg-4 ms-auto my-3">
        <input
          name="search"
          className="form-control"
          type="search"
          placeholder="Search students"
          aria-label="Search"
          value={searchValue}
          onChange={handleSearch}
        />
      </div>

      <div className="p-3 mb-4 border border-secondary-subtle rounded-3">
        <div className="table-responsive">
          <table className="table table-sm table-dark">
            <thead>
              <tr>
                <th scope="col" className="fw-bold">
                  Date
                </th>
                <th scope="col" className="fw-bold">
                  Full Name
                </th>
                <th scope="col" className="fw-bold">
                  Classroom
                </th>
                <th scope="col" className="fw-bold">
                  Check In
                </th>
                <th scope="col" className="fw-bold">
                  Check Out
                </th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody id="" className="table-group-divider">
              {attendance && attendance.length > 0 ? (
                showStudents()
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

export default ViewAttendancePage;
