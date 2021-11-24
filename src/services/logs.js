import axios from "axios";

// creates a basic url for every request in this file
const logsService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/journal`,
  withCredentials: true,
});

export function addLog(data) {
  return logsService.post("/add", data);
}

export function getAllByPet(petId) {
  return logsService.get(`/${petId}`);
}
