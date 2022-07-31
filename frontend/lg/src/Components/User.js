import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../Services/UserService";
import "./Home.css";

const User = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // checking if user already logged in
    let user = localStorage.getItem("user");
    if (user && user !== null) {
      navigate("/user/homepage");
    }
  }, []);

  // user json
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const validateForm = (error) => {
    let t = true;
    Object.values(user).forEach((val) => val.length === 0 && (t = false));

    let valid = true;
    Object.values(error).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return t && valid;
  };

  // updating field values of user json
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        errors.username =
          value.length < 5 ? "Username must be atleast length 5" : "";
        break;
      case "password":
        errors.password =
          value.length < 5 ? "Password must be atleast length 5" : "";
        break;
      case "firstname":
        errors.firstname =
          value.length > 15 ? "First Name Max length is 15" : "";
        errors.firstname =
          value.length === 0 ? "First Name cannot be Empty" : "";
        break;
      case "lastname":
        errors.lastname = value.length > 10 ? "Last Name Max length is 10" : "";
        errors.lastname = value.length === 0 ? "Last Name cannot be Empty" : "";
        break;
      case "email":
        errors.email = /[a-z]{3,}\@[a-z]{3,9}\.[a-z]{2,5}/.test(value)
          ? ""
          : "Email is Not Valid";
        break;
      default:
        break;
    }

    setUser({ ...user, [name]: value });
  };

  const saveUser = (e) => {
    e.preventDefault();
    if (validateForm(errors)) {
      console.info("Valid Form");
      UserService.createUser(user)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            console.log(
              "------------User Registered Successfully(201)----------------"
            );
            navigate("/user/login");
          }
        })
        .catch((error) => {
          console.log(
            "--------------User Already Exists(409)-------------------"
          );
          console.log(error.response);
        });
    } else {
      console.error("Invalid form");
    }
  };

  return (
    // <div>
    //   <div className="login">
    //   <input type="text" name="firstname" placeholder="First Name" onChange={(e)=>handleChange(e)}></input>
    //   <input type="text" name="lastname" placeholder="Last Name" onChange={(e)=>handleChange(e)}></input>
    //   <input type="email" name="email" placeholder="Email Address" onChange={(e)=>handleChange(e)}></input>
    //   <input type="text" name="username" placeholder="Username" onChange={(e)=>handleChange(e)}></input>
    //   <input type="password" name="password" placeholder="Password" onChange={(e)=>handleChange(e)}></input>
    //   <button onClick={saveUser}>Register</button>
    //   </div>
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
      <div className="container mt-2 pt-4">
        <div className="col-md-5">
          <center>
            <img
              src={require("./final_logo.png")}
              alt="profile-img"
              className="profile-img-card"
              height={250}
              width={250}
            />
            <h1>
              <p className="text-center">
                <em>
                  <i>User Signup</i>
                </em>
              </p>
            </h1>
            <br></br>
            <div className="form-group">
              <em>
                <i>
                  <b>
                    <label htmlFor="firstname">FIRST NAME</label>
                  </b>
                </i>
              </em>
              <input
                type="text"
                className="form-control"
                name="firstname"
                placeholder="First Name"
                onChange={(e) => handleChange(e)}
              ></input>
              {errors.firstname.length > 0 && (
                <span className="error">{errors.firstname}</span>
              )}
            </div>
            <div className="form-group">
              <em>
                <i>
                  <b>
                    <label htmlFor="lastname">LAST NAME</label>
                  </b>
                </i>
              </em>
              <input
                type="text"
                className="form-control"
                name="lastname"
                placeholder="Last Name"
                onChange={(e) => handleChange(e)}
              ></input>
              {errors.lastname.length > 0 && (
                <span className="error">{errors.lastname}</span>
              )}
            </div>
            <div className="form-group">
              <em>
                <i>
                  <b>
                    <label htmlFor="email">EMAIL ADDRESS</label>
                  </b>
                </i>
              </em>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email Address"
                onChange={(e) => handleChange(e)}
              ></input>
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
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
                placeholder="Username"
                onChange={(e) => handleChange(e)}
              ></input>
              {errors.username.length > 0 && (
                <span className="error">{errors.username}</span>
              )}
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
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
              ></input>
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="form-group pb-4">
              <button className="btn btn-success btn-block" onClick={saveUser}>
                Register
              </button>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default User;
