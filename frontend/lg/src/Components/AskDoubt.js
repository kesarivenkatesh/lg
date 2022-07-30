import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserService from "../Services/UserService";

const AskDoubt = () => {
  let { id } = useParams();
  let { username } = useParams();
  const [doubt, setDoubt] = useState({
    question: "",
  });
  const [errors] = useState({
    question: "",
  });
  const [allDoubts, setAllDoubts] = useState(null);
  const [t, setT] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getAllDoubts()
      .then((response) => {
        console.log("------------All Doubts-----------");
        console.log(response);
        let doubts = response.data;
        const res = doubts.filter((doubt) => doubt.id !== id);
        setAllDoubts(res);
        setT(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    errors.question = value.length === 0 ? "Enter your Doubt" : "";
    setDoubt({ ...doubt, [e.target.name]: value });
  };

  const askDoubt = () => {
    UserService.askDoubt(username, id, doubt)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="p-2">
        <button
          className="btn-primary float-right"
          onClick={() => navigate("/user/homepage")}
        >
          Back
        </button>
      </div>
      <h2>Course Id: {id}</h2>
      <h3>Ask your doubt.... {username}</h3>
      <p>Before that check if already asked</p>
      <form>
        <div className="form-group">
          <label for="question">Type Question</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter question"
            name="question"
            id="question"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.question.length > 0 && <span>{errors.question}</span>}
        </div>
        <button type="submit" className="btn btn-primary" onClick={askDoubt}>
          Submit
        </button>
      </form>

      <h3 className="text-center">All Doubts</h3>

      <table className="table table-striped table-light">
        {t && (
          <thead className="thead-dark">
            <tr>
              <th scope="col">CourseId</th>
              <th scope="col">Question</th>
              <th scope="col">Answer</th>
            </tr>
          </thead>
        )}
        {t && (
          <tbody>
            {allDoubts.map((doubt) => (
              <tr key={doubt.question}>
                <td>{doubt.id}</td>
                <td>{doubt.question}</td>
                <td>{doubt.answer}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default AskDoubt;
