import axios from "axios";

const API_URL = "http://api.seev.pro:5000/users/";

class AuthService {
  login(login, password) {
    return axios
      .post(API_URL + "authenticate", {
        login,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    sessionStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("user"));
  }
}

export default new AuthService();
