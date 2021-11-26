import axios from "axios";

// creates a basic url for every request in this file
const eventsService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/events`,
  withCredentials: true,
});

export function addEvent(data) {
  return eventsService.post("/add", data);
}

export function getEvents() {
  return eventsService.get("/");
}