import React from "react";
import { useNavigate } from "react-router";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const about = () => {
    navigate("/about");
  };
  const dashboard = () => {
    navigate("/user/login");
  };
  return (
    <div className="navbar">
      <img
        src={require("./nav.png")}
        alt="profile-img"
        className="profile-img-card"
        height={50}
        width={50}
      />
      <h3 className="title">Learner's Guide</h3>
      <div className="p-2">
        <button onClick={about}>
          <h4>
            <i>About us</i>
          </h4>
        </button>
        <button onClick={dashboard}>
          <h4>
            <i>Go to Dashboard</i>
          </h4>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
