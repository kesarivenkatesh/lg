import axios from "axios";

const CONTRIBUTOR_API_BASE_URL = "http://localhost:9003/contributor";

class ContributorService {
  register(contributor) {
    return axios.post(CONTRIBUTOR_API_BASE_URL + "/register", contributor);
  }

  login(contributor) {
    return axios.post(CONTRIBUTOR_API_BASE_URL + "/login", contributor);
  }

  addCourse(username, course) {
    return axios.post(
      CONTRIBUTOR_API_BASE_URL + "/" + username + "/course/add",
      course
    );
  }

  getAllCourses(username) {
    return axios.get(CONTRIBUTOR_API_BASE_URL + "/" + username + "/course/all");
  }

  editCourse(username, id, course) {
    return axios.put(
      CONTRIBUTOR_API_BASE_URL + "/" + username + "/course/edit/" + id,
      course
    );
  }

  deleteCourse(username, id) {
    return axios.delete(
      CONTRIBUTOR_API_BASE_URL + "/" + username + "/course/delete/" + id
    );
  }

  answerQuestion(username, pid, answer) {
    return axios.post(
      CONTRIBUTOR_API_BASE_URL +
        "/" +
        username +
        "/course/doubt/" +
        pid +
        "/answer",
      answer
    );
  }

  upload(data) {
    return axios.post(CONTRIBUTOR_API_BASE_URL + "/upload", data);
  }
}

export default new ContributorService();
