import axios from "axios";

// creates a basic url for every request in this file
const recipesService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/recipes`,
});

export function getAll() {
  return recipesService.get("/");
}

export function getFiltered(query) {
  return recipesService.get(`/search?q=${query}`);
}

export function getFavRecipes() {
  return recipesService.get("/favorite");
}

export function createRecipe(data) {
  return recipesService.post("/create", data);
}
