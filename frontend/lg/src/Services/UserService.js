import axios from "axios";

const USER_API_BASE_URL = "http://localhost:9002/user";

class UserService {

  createUser(user) {
    return axios.post(USER_API_BASE_URL + "/register", user);
  }

  // request: user json {username: "", password: ""}
  // response: 
  //        1. Success: user json {username: "", fname: "", lname: "", password: "", loggedIn: "", email: ""}
  //        2. Failure: Error 404 Not Found
  login(user) {
    return axios.post(USER_API_BASE_URL + "/login", user);
  }

  allCourses(username) {
    return axios.get(USER_API_BASE_URL + "/" + username + "/courses/all");
  }

  enrollCourse(username, id) {
    return axios.get(USER_API_BASE_URL + "/" + username + "/courses/enroll/" + id);
  }

  getEnrolledCourses(username) {
    return axios.get(USER_API_BASE_URL + "/" + username + "/courses/enrolled");
  }

  askDoubt(username, id, doubt) {
    return axios.post(USER_API_BASE_URL + "/" + username + "/course" + "/" + id + "/askdoubt", doubt);
  }

  getAllAnswers() {
    return axios.get(USER_API_BASE_URL + "/doubts/answers/all");
  }
}

export default new UserService();
