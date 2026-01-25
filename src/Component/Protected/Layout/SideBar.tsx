import { NavLink } from "react-router-dom";
import "./styles.css";

const SideBar: React.FC = () => {
  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <nav className="navbar navbar-dark d-md-none px-3 mobileNav">
        <button
          className="btn btn-outline-light"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
        >
          ☰
        </button>
      </nav>

      {/* SIDEBAR */}
      <div
        id="sidebarMenu"
        className="sidebar offcanvas-md offcanvas-start col-md-3 col-lg-2 p-0 bg-body-tertiary"
      >
        <div className="offcanvas-header d-md-none">
          <h5 className="offcanvas-title">MonE</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                to="/portal"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""}`
                }
              >
                <i className="bi bi-speedometer2 fs-5"></i>
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/portal/income"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""}`
                }
              >
                <i className="bi bi-cash-stack fs-5"></i>
                Income
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/portal/expenses"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""}`
                }
              >
                <i className="bi bi-wallet2 fs-5"></i>
                Expenses
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/portal/investment"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""}`
                }
              >
                <i className="bi bi-graph-up fs-5"></i>
                Investments
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
