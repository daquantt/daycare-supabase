import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-subtle border-bottom" aria-label="Navigation">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-lg-flex justify-content-md-between" id="navbarMenu">
            <NavLink className="navbar-brand col-lg-3 me-0" to="/">
              DayCareDash
            </NavLink>
            <ul className="navbar-nav col-lg-6 justify-content-lg-end">
              <li className="nav-item">
                <NavLink className={linkClass} aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Student
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/register-student">
                      Register Student
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/student-list">
                      Student Listing
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink className={linkClass} to="/student">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={linkClass} to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
