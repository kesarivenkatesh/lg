import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ContributorService from "../Services/ContributorService";

const ContributorSignup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let contributor = localStorage.getItem("contributor");
    if (contributor && contributor !== null) {
      navigate("/contributor/dashboard");
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

  const handleChange = (e) => {
    const value = e.target.value;
    setContributor({ ...contributor, [e.target.name]: value });
    console.log(contributor);
  };

  const handleChangeNumber = (e) => {
    const value = e.target.value;
    setContributor({ ...contributor, ["experience"]: parseInt(value) });
    console.log(contributor);
  };

  const saveContributor = (e) => {
    e.preventDefault();
    console.log(contributor);
    ContributorService.register(contributor)
      .then((response) => {
        console.log(response);
        navigate("/contributor/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setContributor({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      experience: 0,
    });
    console.log(contributor);
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
    <div className="container mt-3">
      <div className="col-md-5">
        <div className="card card-container">
          <center>
            {" "}
            <img
              src={require("./final_logo.png")}
              alt="profile-img"
              className="profile-img-card"
              height={300}
              width={300}
            />
            <h1>
              <p class="text-center">
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
                onChange={(e) => handleChangeNumber(e)}
              ></input>
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
            </div>
            <div className="form-group">
              <button
                className="btn btn-success btn-block"
                onClick={saveContributor}
              >
                Register
              </button>
              <button className="btn btn-warning btn-block" onClick={reset}>
                Clear
              </button>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default ContributorSignup;
