import axios from "axios";

// creates a basic url for every request in this file
const authService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`,
  withCredentials: true,
});

export function login(credentials) {
  return authService.post("/login", credentials);
}

export function signup(credentials) {
  return authService.post("/signup", credentials);
}

export function loggedIn() {
  return authService.get("/loggedin");
}

export function logout() {
  return authService.post("/logout");
}

