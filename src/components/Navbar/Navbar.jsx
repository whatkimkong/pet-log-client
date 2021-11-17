import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import logo from "../../images/logo.png";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ user, handleLogout }) => {
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar__container">
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link to={PATHS.HOMEPAGE} className="navbar__link">
            <MenuItem onClick={handleClose} sx={{ fontSize: "0.9rem" }}>
              Homepage
            </MenuItem>
          </Link>
          <Link to={PATHS.RECIPES} className="navbar__link">
            <MenuItem onClick={handleClose} sx={{ fontSize: "0.9rem" }}>
              Recipes
            </MenuItem>
          </Link>
          <Link to={PATHS.SERVICES} className="navbar__link">
            <MenuItem onClick={handleClose} sx={{ fontSize: "0.9rem" }}>
              Services
            </MenuItem>
          </Link>
          {user && (
            <>
              {" "}
              <Link to={PATHS.LOGS} className="navbar__link">
                <MenuItem onClick={handleClose} sx={{ fontSize: "0.9rem" }}>
                  Logs
                </MenuItem>
              </Link>
              <Link to={PATHS.CALENDAR} className="navbar__link">
                <MenuItem onClick={handleClose} sx={{ fontSize: "0.9rem" }}>
                  Calendar
                </MenuItem>
              </Link>
              <hr />
              <MenuItem onClick={handleLogout} sx={{ fontSize: "0.9rem" }}>
                Logout
              </MenuItem>
            </>
          )}
        </Menu>
      </div>
      <Link to={PATHS.HOMEPAGE} className="navbar__link-logo">
        <img src={logo} alt={CONSTS.CAPITALIZED_APP} className="navbar__logo" />
      </Link>
      <div className="nav__authLinks">
        {user ? (
          <>
            <Link to={PATHS.USER_PROFILE}>
              <img
                src={user.profilePic}
                alt={user.firstName}
                className="navbar__profile-pic"
              />
            </Link>
          </>
        ) : (
          <>
            {pathname !== PATHS.HOMEPAGE && (
              <Link to={PATHS.SIGNUPPAGE} className="authLink">
                Signup
              </Link>
            )}
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
