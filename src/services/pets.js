import axios from "axios";

// creates a basic url for every request in this file
const petsService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/pets`,
  withCredentials: true,
});

export function getPets() {
  return petsService.get("/");
}

export function addPet(data) {
  return petsService.post("/add", data);
}
