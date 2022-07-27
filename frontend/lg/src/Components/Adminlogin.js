import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminService from "../Services/AdminService";

const Adminlogin = () => {
  const [admin, setAdmin] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    let admin = localStorage.getItem("admin");
    if (admin && admin !== null) {
      navigate("/admin/homepage");
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setAdmin({ ...admin, [e.target.name]: value });
  };

  const validateLoginDetails = (e) => {
    e.preventDefault();
    AdminService.validateLogin(admin)
      .then((response) => {
        console.log(response);
        if (response.data === "") {
          navigate("/admin/login");
        } else {
          localStorage.setItem("admin", response);
          navigate("/admin/homepage");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // <div>
    //     <input type="text" name="username" placeholder="Enter Username" onChange={(e)=>handleChange(e)}></input>
    //     <input type="password" name="password" placeholder="Enter the password" onChange={(e)=>handleChange(e)}></input>
    //     <button onClick={validateLoginDetails}>Login</button>
    //     <button onClick={() => navigate("/user/login")}>Login as User</button>
    // </div>
    <div
      style={{
        backgroundImage: `url("https://prmceam.ac.in/wp-content/uploads/2017/05/background-learner1.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="container mt-3">
        <div className="col-md-5">
          <center>
            <div className="pt-5">
              <img
                src={require("./final_logo.png")}
                alt="profile-img"
                className="profile-img-card"
                height={250}
                width={250}
              />
            </div>
            <div className="form-group">
              <em>
                <i>
                  <b>
                    <label htmlFor="username">USERNAME</label>
                  </b>
                </i>
              </em>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter Username"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <em>
                <i>
                  <b>
                    <label htmlFor="password">PASSWORD</label>
                  </b>
                </i>
              </em>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter the password"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <button
                className="btn btn-success btn-block"
                type="submit"
                onClick={validateLoginDetails}
              >
                Login
              </button>
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                onClick={() => navigate("/user/login")}
              >
                Login as User
              </button>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};
export default Adminlogin;
