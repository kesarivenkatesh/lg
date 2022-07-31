import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ContributorService from "../Services/ContributorService";

const ContributorSignup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let contributor = localStorage.getItem("contributor");
    if (contributor && contributor !== null) {
      navigate("/contributor/homepage");
    }
  }, []);

  const [contributor, setContributor] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    experience: 0,
  });
  const [errors] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    experience: "",
  });

  const validateForm = (error) => {
    let t = true;
    Object.values(contributor).forEach(
      (val) => val.length === 0 && (t = false)
    );

    let valid = true;
    Object.values(error).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return t && valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        errors.username =
          value.length < 4 ? "Username must be atleast length 5" : "";
        break;
      case "password":
        errors.password =
          value.length < 4 ? "Password must be atleast length 5" : "";
        break;
      case "firstname":
        errors.firstname = value.length === 0 ? "Need First Name" : "";
        errors.firstname =
          value.length > 15 ? "First Name Max length is 15" : "";
        break;
      case "lastname":
        errors.lastname = value.length === 0 ? "Need Last Name" : "";
        errors.lastname = value.length > 10 ? "Last Name Max length is 10" : "";
        break;
      case "email":
        errors.email = /[a-z0-9]{3,}@[a-z]{3,9}\.[a-z]{1,5}/.test(value)
          ? ""
          : "Email is Not Valid";
        break;
      case "experience":
        errors.experience =
          contributor.experience < 0
            ? "Experience must be positive value."
            : "";
        break;
      default:
        break;
    }

    setContributor({ ...contributor, [name]: value });
    // console.log(contributor);
  };

  const saveContributor = (e) => {
    e.preventDefault();
    // console.log(contributor);
    if (validateForm(errors)) {
      console.info("Valid Form");
      ContributorService.register(contributor)
        .then((response) => {
          console.log(response);
          navigate("/contributor/login");
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
        });
    } else {
      console.error("Invalid form");
    }
  };

  return (
    // <div>
    //     <p>Contributor Signup</p>
    //   <input type="text" name="firstname" placeholder="First Name" onChange={(e)=>handleChange(e)}></input>
    //   <input type="text" name="lastname" placeholder="Last Name" onChange={(e)=>handleChange(e)}></input>
    //   <input type="email" name="email" placeholder="Email Address" onChange={(e)=>handleChange(e)}></input>
    //   <input type="number" name="experience" placeholder="Experience in Year(s)" onChange={(e)=>handleChangeNumber(e)}></input>
    //   <input type="text" name="username" placeholder="Username" onChange={(e)=>handleChange(e)}></input>
    //   <input type="password" name="password" placeholder="Password" onChange={(e)=>handleChange(e)}></input>
    //   <button onClick={saveContributor}>Register</button>
    //   <button onClick={reset}>Clear</button>
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
            <div className="pt-4">
              <img
                src={require("./final_logo.png")}
                alt="profile-img"
                className="profile-img-card"
                height={250}
                width={250}
              />
            </div>
            <h1>
              <p className="text-center">
                <em>
                  <i>Contributor Signup</i>
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
              {errors.firstname.length > 0 && <span>{errors.firstname}</span>}
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
              {errors.lastname.length > 0 && <span>{errors.lastname}</span>}
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
              {errors.email.length > 0 && <span>{errors.email}</span>}
            </div>
            <div className="form-group">
              <em>
                <i>
                  <b>
                    <label htmlFor="experience">EXPERIENCE</label>
                  </b>
                </i>
              </em>
              <input
                type="number"
                className="form-control"
                name="experience"
                placeholder="Experience in Year(s)"
                onChange={(e) => handleChange(e)}
              ></input>
              {contributor.experience < 0 && <span>{errors.experience}</span>}
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
              {errors.username.length > 0 && <span>{errors.username}</span>}
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
              {errors.password.length > 0 && <span>{errors.password}</span>}
            </div>
            <div className="form-group">
              <button
                className="btn btn-success btn-block"
                onClick={saveContributor}
              >
                Register
              </button>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default ContributorSignup;
