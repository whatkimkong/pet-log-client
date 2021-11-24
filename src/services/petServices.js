import axios from "axios";

// creates a basic url for every request in this file
const petServicesService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/services`,
  withCredentials: true,
});

export function getAll() {
  return petServicesService.get("/");
}

export function createService(data) {
  return petServicesService.post("/add", data);
}
