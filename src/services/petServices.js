import axios from "axios";

// creates a basic url for every request in this file
const petServicesService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/services`,
  withCredentials: true,
});

export function getAll() {
  return petServicesService.get("/");
}

export function getOne(serviceId) {
  return petServicesService.get(`/${serviceId}`);
}

export function createService(data) {
  return petServicesService.post("/add", data);
}

export function editService(serviceId, data) {
  return petServicesService.patch(`/${serviceId}`, data);
}

export function deleteService(serviceId) {
  return petServicesService.delete(`/${serviceId}`);
}

export function createReview(serviceId, data) {
  return petServicesService.post(`/${serviceId}/reviews/create`, data);
}
