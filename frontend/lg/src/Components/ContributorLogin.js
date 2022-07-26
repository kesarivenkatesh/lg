import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ContributorService from "../Services/ContributorService";

const ContributorLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let contributor = localStorage.getItem("contributor");
    if (contributor && contributor !== null) {
      navigate("/contributor/dashboard");
    }
  }, []);

  const [contributor, setContributor] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setContributor({ ...contributor, [e.target.name]: value });
  };

  const validateLoginDetails = () => {
    ContributorService.login(contributor)
      .then((response) => {
        if (response.data === "") {
          alert("Login Failed");
          navigate("/contributor/login");
        } else {
          console.log(response);
          localStorage.setItem("contributor", JSON.stringify(response.data));
          navigate("/contributor/homepage");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // <div>
    //     <input type="text" name="username" placeholder="Username" onChange={(e)=>handleChange(e)}></input>
    //     <input type="text" name="password" placeholder="Password" onChange={(e)=>handleChange(e)}></input>
    //     <button onClick={validateLoginDetails}>Login</button>
    //     <button onClick={() => navigate("/contributor/signup")}>Signup As Contributor</button>
    // </div>
    <div style={{ 
      backgroundImage: `url("https://prmceam.ac.in/wp-content/uploads/2017/05/background-learner1.jpg")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: "100vw",
  height: "100vh"
    }}>
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
            
            <div className="form-group pt-4">
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
                type="text"
                className="form-control"
                name="password"
                placeholder="Password"
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
            <div className="form-group pb-4">
              <button
                className="btn btn-primary btn-block"
                onClick={() => navigate("/contributor/signup")}
              >
                Signup As Contributor
              </button>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default ContributorLogin;
