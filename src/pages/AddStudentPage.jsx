import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addStudent } from "../api/studentApi";

const AddStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [classroom, setClassroom] = useState("");
  const [active, setActive] = useState("");

  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();

    const newStudent = {
      firstName,
      lastName,
      birthDate,
      classroom,
      active,
    };

    addStudent(newStudent);
    toast.success(`${firstName} was registered`);
    setFirstName("");
    setLastName("");
    setBirthDate("");
    setClassroom("");
    setActive("");
    return navigate("/register-student");
  };

  return (
    <section>
      <h2 className="text-center my-4">Register Student</h2>
      <div className="mx-auto w-50">
        <form onSubmit={submitForm} className="container p-3 mx-auto border rounded-3">
          <div className="form-group row mb-2">
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
          <div className="form-group row mb-2">
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
          <div className="form-group row mb-2">
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
          <div className="form-group row mb-2">
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
          <div className="form-group row mb-2">
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
            <button id="inputSubmitBtn" type="submit" className="btn btn-success w-100 mt-3 px-4 fs-5">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddStudent;
