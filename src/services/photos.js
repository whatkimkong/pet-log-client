import axios from "axios";

// creates a basic url for every request in this file
const photosService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/photos`,
  withCredentials: true,
});

export function getAll() {
  return photosService.get("/");
}

export function addPhoto(data) {
  return photosService.post("/add", data);
}

export function deletePhoto(photoId) {
  return photosService.delete(`/${photoId}`);
}
