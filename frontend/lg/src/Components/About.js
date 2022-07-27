import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="founder-details">
      <br></br>
      <br></br>
      <br></br>
      <h2>About Learners's Guide</h2>
      <br></br>
      <br></br>
      <p className="description d-flex justify-content-center">
        <h4>
          {" "}
          Learner'6s Guide platform is an online self-paced learning platform
          where courses are provided by the contributor and purchased by the
          users. The user refers to the individual who purchased the course. The
          admin manages the contributors of the courses and also users. This
          application contains three modules: Admin, Contributor, User modules.
        </h4>
      </p>
      <br></br>
      <br></br>
      <br></br>
      <h2>Founders of the Website</h2>
      <br></br>
      <br></br>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S.NO.</th>
              <th scope="col">NAME</th>
              <th scope="col">CONTACT</th>
              <th scope="col">COUNTRY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Venkatesh Reddy Kesari</td>
              <td>9734465743</td>
              <td>India</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Sai Vamsi Vybagula</td>
              <td>9234165743</td>
              <td>India</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Ananya LNU</td>
              <td>9734465743</td>
              <td>India</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Aswin Surya K</td>
              <td>9734465743</td>
              <td>India</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Haripriya</td>
              <td>9734465743</td>
              <td>India</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Karthikeya Tripati</td>
              <td>9734465743</td>
              <td>India</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default About;
