import { useState } from "react";
import { toast } from "react-toastify";
import { addStudent } from "../api/studentApi";
import { FaUserPlus } from "react-icons/fa";

const AddStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [classroom, setClassroom] = useState("");
  const [active, setActive] = useState("");

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
  };

  return (
    <section className="container pb-3">
      <h2 className="text-center my-4">
        <FaUserPlus className="mb-2" /> Register Student
      </h2>
      <div className="mx-auto row">
        <form onSubmit={submitForm} className="col-sm-8 col-lg-6 p-3 mx-auto border rounded-3">
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
            <button id="inputSubmitBtn" type="submit" className="btn btn-success w-100 mt-3 px-4 fs-5">
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddStudent;
