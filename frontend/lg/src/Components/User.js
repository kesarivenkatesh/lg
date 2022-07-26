import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../Services/UserService";

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

  // updating field values of user json
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const saveUser = (e) => {
    e.preventDefault();
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
            <h1>
              <p class="text-center">
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
