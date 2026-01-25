import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import TopNav from "./TopNav";

export default function ProtectedLayout() {
  return (
    <>
      <TopNav />

      <div className="container-fluid">
        <div className="row">
          <SideBar />

          <main className="col-md-9 col-lg-10 px-md-4 pt-3">
            {/* Render route-specific component here */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
