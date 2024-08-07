import React, { useEffect, useState } from "react";
import ClassList from "../components/ClassList";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [classroom, setClassroom] = useState("");
  const [greeting, setGreeting] = useState("Welcome to Daycare");
  const [displayToggle, setDisplayToggle] = useState(true);

  const loadClass = (event) => {
    setClassroom(event.target.innerText);

    //hide classroom buttons
    setDisplayToggle(!displayToggle);
    setGreeting(`${event.target.innerText} Classroom`);
  };

  const returnToClassList = () => {
    setClassroom("");
    //hide class section
    setDisplayToggle(!displayToggle);
    setGreeting("Welcome to Daycare");
  };

  return (
    <main>
      <section className="container">
        <h2 className="text-center my-4">{greeting}</h2>

        <div id="class-buttons" className={`${displayToggle ? "d-block" : "d-none"} mb-3`}>
          <p className="text-center">Select a Classroom</p>
          <div className="d-flex justify-content-center align-items-end">
            <button onClick={loadClass} className="btn btn-warning me-3">
              Amber
            </button>
            <button onClick={loadClass} className="btn btn-danger me-3">
              Ruby
            </button>
            <button onClick={loadClass} className="btn btn-light me-3">
              Pearl
            </button>
          </div>
        </div>
      </section>

      <div id="class-section" className={`container ${!displayToggle ? "d-block" : "d-none"}`}>
        <ClassList classroom={classroom} />
        <button onClick={returnToClassList} className="btn btn-secondary d-block mx-auto mt-3" type="button">
          Return to Class List
        </button>
      </div>
    </main>
  );
};

export default Homepage;
