import axios from "axios";

// creates a basic url for every request in this file
const userService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/user`,
  withCredentials: true,
});

export function getUser() {
  return userService.get("/");
}

export function editUser(data) {
  return userService.patch("/edit", data);
}