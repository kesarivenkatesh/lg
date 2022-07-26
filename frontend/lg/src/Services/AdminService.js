import axios from "axios";

const ADMIN_API_BASE_URL = "http://localhost:9001/admin";

class AdminService {
  validateLogin(admin) {
    return axios.post(ADMIN_API_BASE_URL + "/login", admin);
  }
  getContributors() {
    return axios.get(ADMIN_API_BASE_URL + "/contributor/all");
  }
  getUsers() {
    return axios.get(ADMIN_API_BASE_URL + "/user/all");
  }
}

export default new AdminService();
