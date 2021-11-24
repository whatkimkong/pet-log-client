import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/Auth/LogIn";
import Signup from "./pages/Auth/Signup";
import Recipes from "./pages/Recipes/Recipes";
import { loggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";
import AddRecipe from "./pages/Recipes/AddRecipe";
import EditRecipe from "./pages/Recipes/EditRecipe";
import RecipeDetails from "./pages/Recipes/RecipeDetails";
import Photos from "./pages/PhotoGallery/Photos";
import UserProfile from "./pages/Profiles/UserProfile";
import PetProfile from "./pages/Profiles/PetProfile";
import AddPet from "./pages/Profiles/AddPet";
import EditPet from "./pages/Profiles/EditPet";
import LoadingComponent from "./components/Loading";
import PetServices from "./pages/PetServices/PetServices";
import PetLog from "./pages/Profiles/PetLog";
import AddLog from "./pages/Profiles/AddLog";

function App() {
  const navigate = useNavigate();
  const [user, setStateUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function setUser(user, loggedInStatus) {
    setIsLoggedIn(loggedInStatus || isLoggedIn);
    setStateUser(user);
  }

  function getUser() {
    if (user === null) {
      loggedIn()
        .then((response) => {
          setIsLoggedIn(true);
          setStateUser(response.data.user);
        })
        .catch((err) => setIsLoggedIn(false));
    }
  }

  function handleLogout() {
    logout()
      .then(() => {
        setUser(null, false);
        navigate(PATHS.HOMEPAGE);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className="App"
      style={{ backgroundColor: user ? "#ed5d30" : "white" }}
    >
      {isLoggedIn === null && <LoadingComponent />}
      {isLoggedIn !== null && (
        <>
          <Navbar handleLogout={handleLogout} user={user} setUser={setUser} />
          <Routes>
            <Route
              exact
              path={PATHS.HOMEPAGE}
              element={<HomePage user={user} />}
            />
            <Route
              exact
              path={PATHS.SIGNUPPAGE}
              element={<Signup setUser={setUser} />}
            />
            <Route
              exact
              path={PATHS.LOGINPAGE}
              element={<LogIn setUser={setUser} />}
            />
            <Route
              exact
              path={PATHS.RECIPES}
              element={<Recipes user={user} />}
            />
            <Route
              exact
              path={PATHS.RECIPES_DETAILS}
              element={<RecipeDetails user={user} setUser={setUser} />}
            />
            <Route
              exact
              path={PATHS.CREATE_RECIPE}
              element={
                isLoggedIn ? (
                  <AddRecipe user={user} />
                ) : (
                  <Navigate to={PATHS.LOGINPAGE} />
                )
              }
            />
            <Route
              exact
              path={PATHS.EDIT_RECIPE}
              element={
                isLoggedIn ? (
                  <EditRecipe user={user} />
                ) : (
                  <Navigate to={PATHS.LOGINPAGE} />
                )
              }
            />
            <Route
              exact
              path={PATHS.PHOTOS}
              element={
                isLoggedIn ? (
                  <Photos user={user} />
                ) : (
                  <Navigate to={PATHS.LOGINPAGE} />
                )
              }
            />
            <Route
              exact
              path={PATHS.USER_PROFILE}
              element={
                isLoggedIn ? (
                  <UserProfile user={user} setUser={setUser} />
                ) : (
                  <Navigate to={PATHS.LOGINPAGE} />
                )
              }
            />
            <Route
              exact
              path={PATHS.PETS_PROFILE}
              element={
                isLoggedIn ? (
                  <PetProfile user={user} setUser={setUser} />
                ) : (
                  <Navigate to={PATHS.LOGINPAGE} />
                )
              }
            />
            <Route
              exact
              path={PATHS.ADD_PET}
              element={
                isLoggedIn ? (
                  <AddPet user={user} setUser={setUser} />
                ) : (
                  <Navigate to={PATHS.LOGINPAGE} />
                )
              }
            />
            <Route
              exact
              path={PATHS.EDIT_PET}
              element={
                isLoggedIn ? (
                  <EditPet user={user} />
                ) : (
                  <Navigate to={PATHS.LOGINPAGE} />
                )
              }
            />
            <Route
              exact
              path={PATHS.SERVICES}
              element={<PetServices user={user} />}
            />
            <Route
              exact
              path={PATHS.PET_LOGS}
              element={
                isLoggedIn ? (
                  <PetLog user={user} />
                ) : (
                  <Navigate to={PATHS.LOGINPAGE} />
                )
              }
            />
            <Route
              exact
              path={PATHS.ADD_PET_LOGS}
              element={
                isLoggedIn ? (
                  <AddLog user={user} />
                ) : (
                  <Navigate to={PATHS.LOGINPAGE} />
                )
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
