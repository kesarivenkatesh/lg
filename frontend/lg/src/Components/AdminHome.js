import React from "react";
import AdminService from "../Services/AdminService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AdminHome = () => {
  const navigate = useNavigate();
  const [contributors, setContributors] = useState(null);
  const [hasUsers, setHasUsers] = useState(false);
  const [hasContributors, setHasContributors] = useState(false);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    let admin = localStorage.getItem("admin");
    if (admin === null) {
      navigate("/admin/login");
    }
    AdminService.getUsers()
      .then((response) => {
        console.log(response);
        setUsers(response.data);
        setHasUsers(true);
      })
      .catch((error) => {
        console.log(error);
      });

    AdminService.getContributors()
      .then((response) => {
        console.log(response);
        setContributors(response.data);
        setHasContributors(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div>
      <div className=" margin p-3">
        <button className="btn-danger float-right" onClick={logout}>
          <h3>Logout</h3>
        </button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="margin">
        <h2>
          <center>
            <em>
              <i>Contributors List</i>
            </em>
          </center>
        </h2>
        <br></br>
        <br></br>
        <div className="margin1">
          <table className="table table-striped table-light">
            {hasContributors && (
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Experience(in Yrs)</th>
                </tr>
              </thead>
            )}
            {hasContributors && (
              <tbody>
                {contributors.map((course) => (
                  <tr key={course.username}>
                    <td>{course.username}</td>
                    <td>{course.firstname + " " + course.lastname}</td>
                    <td>{course.email}</td>
                    <td>{course.experience}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <h2>
          <center>
            <em>
              <i>Users List</i>
            </em>
          </center>
        </h2>
        <br></br>
        <br></br>
        <div className="margin1">
          <table className="table table-striped table-light">
            {hasUsers && (
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email Address</th>
                </tr>
              </thead>
            )}
            {hasUsers && (
              <tbody>
                {users.map((course) => (
                  <tr key={course.username}>
                    <td>{course.username}</td>
                    <td>{course.firstname + " " + course.lastname}</td>
                    <td>{course.email}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminHome;
