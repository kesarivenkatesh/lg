import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ContributorService from "../Services/ContributorService";

const ContributorAdd = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: 0,
  });
  useEffect(() => {
    console.log("contributottt");
    let contributor = JSON.parse(localStorage.getItem("contributor"));

    let username = contributor.username;
    console.log(username);

    setUsername(username);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setCourse({ ...course, [e.target.name]: value });
    console.log(course);
  };

  const handleChangeNumber = (e) => {
    const value = e.target.value;
    setCourse({ ...course, ["estimatedTime"]: parseInt(value) });
    console.log(course);
  };

  const add = () => {
    ContributorService.addCourse(username, course)
      .then((response) => {
        console.log(response);
        navigate("/contributor/homepage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-ai-robot-artificial-intelligence-background-image_66477.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="margin1">
        <h1>
          <p className="text-center">
            <em>
              <i>Please provide the following details for new course</i>
            </em>
          </p>
        </h1>
        <div className="container pt-5 mt-5 ml-10 ">
          <div className="alignright">
            <div className="col-md-10">
              <center>
                <br></br>
                <div className="form-group">
                  <em>
                    <i>
                      <b>
                        <label htmlFor="title">Course Title</label>
                      </b>
                    </i>
                  </em>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Course Title"
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>
                <div className="form-group">
                  <em>
                    <i>
                      <b>
                        <label htmlFor="description">Description</label>
                      </b>
                    </i>
                  </em>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Description"
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>
                <div className="form-group">
                  <em>
                    <i>
                      <b>
                        <label htmlFor="estimatedtime">Estimated Time</label>
                      </b>
                    </i>
                  </em>
                  <input
                    type="number"
                    className="form-control"
                    name="estimatedtime"
                    placeholder="Estimated Time"
                    onChange={(e) => handleChangeNumber(e)}
                  ></input>

                  <div className="form-group pt-4">
                    <button className="btn btn-success btn-block" onClick={add}>
                      Add Course
                    </button>
                  </div>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributorAdd;
