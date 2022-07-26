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
      <button onClick={logout}>Logout</button>
      <h3 style={{ marginLeft: 650 }}>Contributors List</h3>
      <table className="table table-striped table-light">
        {hasContributors && (
          <thead class="thead-dark">
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

      <h3 style={{ marginLeft: 700 }}>Users List</h3>
      <table className="table table-striped table-light">
        {hasUsers && (
          <thead class="thead-dark">
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
  );
};
export default AdminHome;
