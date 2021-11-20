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

export function addLegalData(data) {
  return petsService.post("/legal/add", data);
}

export function removePet(petId) {
  return petsService.delete(`/${petId}`);
}

export function getOne(petId) {
  return petsService.get(`/${petId}`);
}

export function editPet(petId, data) {
  return petsService.patch(`/${petId}`, data);
}
