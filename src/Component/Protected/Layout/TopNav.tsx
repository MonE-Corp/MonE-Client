import { Link } from "react-router-dom";
import "./styles.css";

function TopNav() {
  return (
    <header
      className="navbar sticky-top logoBg flex-md-nowrap p-0 m-0 shadow"
      id="logo"
    >
      <Link
        to="/dashboard"
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 logoBg"
      >
        <h1 className="m-0">MonE</h1>
      </Link>
    </header>
  );
}

export default TopNav;
