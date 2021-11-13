import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import ProtectedPage from "./pages/ProtectedPage";
import Signup from "./pages/Signup";
import Recipes from "./pages/Recipes";
import { loggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";
import AddRecipe from "./pages/AddRecipe";

function App() {
  const navigate = useNavigate();
  const [user, setStateUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function setUser(user, loggedInStatus) {
    setIsLoggedIn(loggedInStatus);
    setStateUser(user);
  }

  function getUser() {
    if (user === null) {
      loggedIn()
        .then((response) => {
          setIsLoggedIn(true);
          setStateUser(response.data.user);
        })
        .catch((err) => setIsLoggedIn(true));
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
      <Navbar handleLogout={handleLogout} user={user} setUser={setUser} />
      <Routes>
        <Route exact path={PATHS.HOMEPAGE} element={<HomePage />} />
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
        <Route exact path={PATHS.RECIPES} element={<Recipes user={user} />} />
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
      </Routes>
    </div>
  );
}

export default App;
