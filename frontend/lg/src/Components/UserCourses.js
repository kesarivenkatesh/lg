import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserService from "../Services/UserService";
import "./UserCourses.css";

const UserCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState(null);
  const [coursesPresent, setCoursesPresent] = useState(false);
  const [enrolledCoursesPresent, setECP] = useState(false);
  const [enrolledCourses, setEnrolledCoures] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // checking if user already logged in
    let user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      navigate("/user/login");
    }

    let username = user.username;

    setUsername(username);

    // fetching all courses
    UserService.allCourses(username)
      .then((response) => {
        if (response.status === 200) {
          setCoursesPresent(true);
          setCourses(response.data);
        } else if (response.status === 204) {
          console.log("--------------204 No Courses------------");
          console.log(response);
        }
      })
      .catch((error) => {
        console.log("---------Axios Error--------------");
        console.log(error.response);
      });

    // fetching Enrolled Courses
    UserService.getEnrolledCourses(username)
      .then((response) => {
        if (response.status === 200) {
          setECP(true);
          setEnrolledCoures(response.data);
        } else if (response.status === 204) {
          console.log("----------204 No Enrolled Courses------------");
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // logout
  const logout = (e) => {
    localStorage.removeItem("user");
    navigate("/user/login");
  };

  const enroll = (e, id) => {
    e.preventDefault();

    // enroll a course
    UserService.enrollCourse(username, id)
      .then((response) => {
        if (response.status === 200) {
          setEnrolledCoures(response.data);
          setECP(true);
        } else if (response.status === 409) {
          alert("already Enrolled");
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert("already Enrolled");
        }
        console.log(error);
      });
  };

  const askDoubt = (e, id) => {
    console.log(username);
    navigate("/user/" + username + "/course/" + id + "/askdoubt");
  };

  return (
    <div className="margin">
      <div className="d-flex">
        <div
          className="mr-auto p-2"
          style={{ textTransfrom: "uppercase", fontSize: "30px" }}
        >
          <br></br>Welcome back
          <em>
            <i> {username}...</i>
          </em>
        </div>
        <div className="p-2">
          <button className="btn-danger float-right" onClick={(e) => logout(e)}>
            <h3>Logout</h3>
          </button>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="ml-4">
        <h2>
          <em>
            <i>All Courses</i>
          </em>
        </h2>
        <br></br>
        <br></br>
        {!coursesPresent && (
          <h2>
            <em>
              <i>
                <center>--- No Courses Present ---</center>
              </i>
            </em>
          </h2>
        )}
        <br></br>
        <br></br>
        <table className="table table-striped table-light">
          {coursesPresent && (
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                {/* <th scope="col">Id</th> */}
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Estimated Time(hrs)</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
          )}
          {coursesPresent && (
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <th scope="row">{course.id}</th>
                  {/* <td>{course.id}</td> */}
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.estimatedTime}</td>
                  <td>
                    <button
                      className="btn-success"
                      onClick={(e, id) => enroll(e, course.id)}
                    >
                      Enroll
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <br></br>
        <br></br>
        {/* enrolled Courses */}
        <h2>
          <i>
            <em>Enrolled Courses</em>
          </i>
        </h2>
        <br></br>
        <br></br>
        {!enrolledCoursesPresent && (
          <h2>
            <i>
              <em>
                <center>--- None ---</center>
              </em>
            </i>
          </h2>
        )}
        <table className="table table-striped table-light">
          {enrolledCoursesPresent && (
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Estimated Time(hrs)</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
          )}
          {enrolledCoursesPresent && (
            <tbody>
              {enrolledCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.estimatedTime}</td>
                  <td>
                    <button onClick={(e) => askDoubt(e, course.id)}>
                      Ask Doubt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default UserCourses;
