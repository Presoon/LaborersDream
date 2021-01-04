import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://api.seev.pro:5000/";

class API {
  createNewTicket(ticket) {
    return axios.post(API_URL + "failures/add", ticket, {
      headers: authHeader(),
    });
  }

  getAllTickets() {
    return axios.get(API_URL + "failures/all", { headers: authHeader() });
  }
  getQRCodeInfo(serialnb) {
    return axios.get(API_URL + "resources/qrdata/" + serialnb, {});
  }

  getAllResources() {
    return axios.get(API_URL + "resources/all", { headers: authHeader() });
  }

  addNewResource(resource) {
    return axios.post(API_URL + "resources/add/", resource, { headers: authHeader() });
  }

  deleteResource(id) {
    return axios.delete(API_URL + "resources/delete/", id, { headers: authHeader() });
  }
  

  getAllUsers() {
    return axios.get(API_URL + "users/all", { headers: authHeader() });
  }
  createNewUser(user) {
    return axios.post(API_URL + "users/add", user, { headers: authHeader() });
  }
  deleteUser(iduser) {
    return axios.delete(API_URL + "users/delete/" + iduser, {
      headers: authHeader(),
    });
  }
}

export default new API();
