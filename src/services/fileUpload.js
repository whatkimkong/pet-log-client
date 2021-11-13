import axios from "axios";

// creates a basic url for every request in this file
const authService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  withCredentials: true,
});

export function fileUpload(data) {
  return authService.post("/upload", data);
}
