import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Services/UserService";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // checking if user already logged in(using local storage)
    let user = localStorage.getItem("user");
    if (user && user !== null) {
      navigate("/user/homepage");
    }
  }, []);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  // updating values of input fields
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  // validating login details of user
  const validateLoginDetails = (e) => {
    e.preventDefault();
    UserService.login(user)
      .then((response) => {
        console.log("---------User Login response----------");
        console.log(response.data);
        console.log(
          "----------setting user login response in local storage --------------"
        );
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/user/homepage");
      })
      .catch((error) => {
        console.log("Login details are wrong");
        console.log(error.response.status);
        alert("Login details are wrong");
      });
  };

  return (
    //  <div>
    //     <input type="text" name="username" placeholder="Username" required="required" onChange={(e)=>handleChange(e)}></input>
    //     <input type="text" name="password" placeholder="Password" required="required" onChange={(e)=>handleChange(e)}></input>
    //     <button onClick={validateLoginDetails}>Login</button>
    //     <button onClick={() => navigate("/admin/login")}>Admin</button>
    //     <button onClick={() => navigate("/contributor/login")}>Contributor</button>
    //     <button onClick={() => navigate("/user/register")}>Creat an Account</button>
    //   </div>
   
    <div style={{ 
      backgroundImage: `url("https://prmceam.ac.in/wp-content/uploads/2017/05/background-learner1.jpg")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: "100vw",
        height: "100vh"
    }}>
    
    <div className="container mt-2 pt-4">
      <div className="col-md-5">
          <br></br>
          <br></br>
          <center>
            {" "}
            <img
              src={require("./final_logo.png")}
              alt="profile-img"
              className="profile-img-card"
              height={250}
              width={250}
            />
            <br></br>
            <br></br>
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
            <div className="form-group">
              <label class="float-left form-check-label">
                <input type="checkbox" /> Remember me
              </label>
              <br></br>
            </div>
            <div className="form-group">
              <em>
                <i>
                  <b>
                    <p>----- OR -----</p>
                  </b>
                </i>
              </em>
            </div>
            <div className="form-group pb-4">
              <button
                className="btn btn-dark btn-block"
                onClick={() => navigate("/admin/login")}
              >
                Admin
              </button>
              <button
                className="btn btn-secondary btn-block"
                onClick={() => navigate("/contributor/login")}
              >
                Contributor
              </button>
              <button
                className="btn btn-dark btn-block"
                onClick={() => navigate("/user/register")}
              >
                New User? Create Account
              </button>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Home;
