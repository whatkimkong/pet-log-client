import axios from "axios";

// creates a basic url for every request in this file
const recipesService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/recipes`,
  withCredentials: true,
});

export function getAll(status) {
  return recipesService.get("/", status);
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

export function getOne(recipeId) {
  return recipesService.get(`/${recipeId}`);
}

export function addToFavs(recipeId) {
  return recipesService.patch(`/${recipeId}/addToFavs`);
}

export function removeFromFavs(recipeId) {
  return recipesService.patch(`/${recipeId}/removeFromFavs`);
}

export function deleteRecipe(recipeId) {
  return recipesService.delete(`/${recipeId}`);
}

export function editRecipe(recipeId, data) {
  return recipesService.patch(`/${recipeId}`, data);
}

export function createReview(recipeId, data) {
  return recipesService.post(`/${recipeId}/reviews/create`, data);
}
