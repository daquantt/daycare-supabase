import { FaChild } from "react-icons/fa";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <main>
      <section className="container">
        <h2 className="text-center my-4">Welcome to Daycare</h2>

        <div>
          <FaChild className="fs-1 d-block mx-auto mb-3" />
        </div>
        <div id="class-buttons" className="mb-3">
          <p className="text-center">Select a Classroom</p>
          <div className="d-flex justify-content-center align-items-end">
            <Link to={"/class/1"} className="btn btn-warning me-3">
              Amber
            </Link>
            <Link to={"/class/2"} className="btn btn-danger me-3">
              Ruby
            </Link>
            <Link to={"/class/3"} className="btn btn-light me-3">
              Pearl
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
