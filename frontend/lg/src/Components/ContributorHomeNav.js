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
            <button onClick={logout}>Logout</button>
            <button onClick={addCourse}>Add Course</button>
        </div>
    );
};

export default ContributorHomeNav;