import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} @MoneCorp-NirajanShrestha.{" "}
          <a
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warning text-decoration-underline"
          >
            GitHub Profile
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
