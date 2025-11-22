
import "../../assets/Styles/style.css";
import SignInForm from "../form/SignInForm";
function HomePage() {
  return (
    <div id="homeContainer" className="container-fluid py-5">
      <div id="homeHeroSection" className="container rounded  p-4">
        <div className="row align-items-center">
          {/* LEFT COLUMN */}
          <div className="col-md-6 text-white">
            {/* Top section (logo) */}
            <div id="logobg" >
               <div className="slogan">
                   <h1>MONE</h1>
                </div>
            </div>

            {/* Bottom section (description) */}
            {/* Bottom section (3 feature boxes in one column) */}
<div className="mt-4">
  <div className="row gy-3">

    <div className="col-md-12 col-lg-4">
      <div className="feature-box d-flex flex-column justify-content-center align-items-center p-3 rounded text-center">
        <i className="bi bi-graph-up-arrow mb-2 fs-1"></i>
        <span className="fw-bold small">TRACK</span>
      </div>
    </div>

    <div className="col-md-12 col-lg-4">
      <div className="feature-box d-flex flex-column justify-content-center align-items-center p-3 rounded text-center">
        <i className="bi bi-wallet2 mb-2 fs-1"></i>
        <span className="fw-bold small">MANAGE</span>
      </div>
    </div>

    <div className="col-md-12 col-lg-4">
      <div className="feature-box d-flex flex-column justify-content-center align-items-center p-3 rounded text-center">
        <i className="bi bi-bar-chart-line mb-2 fs-1"></i>
        <span className="fw-bold small">GROW</span>
      </div>
    </div>

  </div>
</div>


          </div>

          {/* RIGHT COLUMN */}
          <div className="col-md-6">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
