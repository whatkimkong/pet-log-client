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

export function getOne(petId, logId) {
  return logsService.get(`/${petId}/${logId}`);
}

export function editLog(petId, logId, data) {
  return logsService.patch(`/${petId}/${logId}`, data);
}
