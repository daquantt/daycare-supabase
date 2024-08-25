import { useState } from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateStudent } from "../api/studentApi";

const EditStudentPage = () => {
  const student = useLoaderData();

  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [birthDate, setBirthDate] = useState(student.birthDate);
  const [classroom, setClassroom] = useState(student.classroom);
  const [active, setActive] = useState(student.active);

  const navigate = useNavigate();
  const { id } = useParams();

  const submitForm = (event) => {
    event.preventDefault();

    const editStudent = {
      id,
      firstName,
      lastName,
      birthDate,
      classroom,
      active,
    };

    updateStudent(editStudent);
    toast.success(`${firstName} was updated`);
    return navigate("/student-list");
  };

  return (
    <section className="container pb-3">
      <h2 className="text-center my-4">Update Student</h2>
      <div className="mx-auto row">
        <form onSubmit={submitForm} className="col-sm-8 col-lg-6 p-3 mx-auto border rounded-3">
          <div className="form-group row mb-2 mb-md-3">
            <label htmlFor="studentId" className="col-md-4 col-form-label text-md-right">
              Student ID:
            </label>
            <div className="col-md-8">
              <input id="studentId" type="text" className="form-control" name="studentId" required autoComplete="on" value={id} disabled />
            </div>
          </div>
          <div className="form-group row mb-2 mb-md-3">
            <label htmlFor="firstName" className="col-md-4 col-form-label text-md-right">
              First Name:
            </label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="firstName"
                required
                autoComplete="on"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row mb-2 mb-md-3">
            <label htmlFor="lastName" className="col-md-4 col-form-label text-md-right">
              Last Name:
            </label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                name="lastName"
                id="lastName"
                required
                autoComplete="on"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row mb-2 mb-md-3">
            <label htmlFor="birthDate" className="col-md-4 col-form-label text-md-right">
              Date of Birth:
            </label>
            <div className="col-md-8">
              <input
                type="date"
                className="form-control"
                name="birthDate"
                id="birthDate"
                required
                autoComplete="on"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row mb-2 mb-md-3">
            <label htmlFor="classroom" className="col-md-4 col-form-label text-md-right">
              Class:
            </label>
            <div className="col-md-8">
              <select id="classroom" className="form-select" value={classroom} onChange={(e) => setClassroom(e.target.value)}>
                <option value="">Select option</option>
                <option value="Amber">Amber</option>
                <option value="Ruby">Ruby</option>
                <option value="Pearl">Pearl</option>
              </select>
            </div>
          </div>
          <div className="form-group row mb-2 mb-md-3">
            <label htmlFor="active" className="col-md-4 col-form-label text-md-right">
              Active:
            </label>
            <div className="col-md-8">
              <select id="active" className="form-select" value={active} onChange={(e) => setActive(e.target.value)}>
                <option value="">Select option</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-center align-content-center">
            <button id="inputSubmitBtn" type="submit" className="btn btn-success mt-3 me-3 px-4 fs-5">
              Update
            </button>
            <Link to={`/student-list`} className="btn btn-secondary mt-3 ms-3 px-4 fs-5">
              Return
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditStudentPage;
