import { useEffect, useState } from "react";
import { fetchStudents } from "../api/studentApi";
import dateFormat, { masks } from "dateformat";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      setLoading(true);
      try {
        const StudentData = await fetchStudents();
        setStudents(StudentData);
        setFilteredStudents(StudentData);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getStudents();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Something went wrong. Please try again...</div>;
  }

  const showStudents = () =>
    filteredStudents.map((student) => {
      const birthDate = new Date(student.birthDate);

      return (
        <tr key={student.id}>
          <td>
            {student.firstName} {student.lastName}
          </td>
          <td>{student.id}</td>
          <td>{dateFormat(birthDate, "dd-mmm-yyyy")}</td>
          <td>{student.classroom}</td>
          <td>{student.status}</td>
          <td>
            <Link to={`/edit-student/${student.id}`}>
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
    const filteredItems = students.filter(
      (student) =>
        student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || student.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filteredItems);
  };

  return (
    <section className="container mt-4">
      <h2>Student Listing</h2>

      <div className="w-25 ms-auto mb-4">
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
                  Full Name
                </th>
                <th scope="col" className="fw-bold">
                  ID
                </th>
                <th scope="col" className="fw-bold">
                  Date of Birth
                </th>
                <th scope="col" className="fw-bold">
                  Classroom
                </th>
                <th scope="col" className="fw-bold">
                  Status
                </th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody id="" className="table-group-divider">
              {students && students.length > 0 ? (
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

export default StudentListPage;
