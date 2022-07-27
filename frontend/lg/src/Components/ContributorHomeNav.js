import React from "react";
import { useNavigate } from "react-router-dom";

const ContributorHomeNav = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("contributor");
    navigate("/contributor/login");
  };

  const addCourse = () => {
    navigate("/contributor/add");
  };

  return (
    <div>
      <div className="p-2">
        <button className="btn-primary float-left" onClick={addCourse}>
          <h3>Add Course</h3>
        </button>
        <button className="btn-danger float-right" onClick={logout}>
          <h3>Logout</h3>
        </button>
      </div>
    </div>
  );
};

export default ContributorHomeNav;
