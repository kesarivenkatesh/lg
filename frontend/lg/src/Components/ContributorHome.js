import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ContributorService from "../Services/ContributorService";
import ContributorHomeNav from "./ContributorHomeNav";

const ContributorHome = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [doubts, setDoubts] = useState(null);

  useEffect(() => {
    let contributor = JSON.parse(localStorage.getItem("contributor"));
    if (contributor === null) {
      navigate("/contributor/login");
    }
    let username = contributor.username;
    setUsername(username);
    console.log("contributorHome" + username);

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ContributorService.getAllCourses(username);
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // const displayDoubts = (e, id) => {
  //   e.preventDefault();
  //   ContributorService.getAllDoubts()
  //     .then((response) => {
  //       console.log("----------doubts res----------");
  //       console.log(response);
  //       let doubtsres = response.data;
  //       if (doubtsres) {
  //         setDoubts((prevElement) => {
  //           return prevElement.filter((doubt) => doubt.id === id);
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log("-------------doubts var------------");
  //   console.log(doubts);
  // };

  const deleteCourse = (e, id) => {
    e.preventDefault();
    ContributorService.deleteCourse(username, id).then((response) => {
      if (courses) {
        setCourses((prevElement) => {
          return prevElement.filter((course) => course.id !== id);
        });
      }
    });
  };

  return (
    <div className="margin">
      <div>
        <ContributorHomeNav />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="margin1">
        <table className="table table-striped table-light ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Estimated Time(hrs)</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          {!loading && (
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.estimatedTime}</td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={(e, id) => deleteCourse(e, course.id)}
                    >
                      delete
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

export default ContributorHome;
