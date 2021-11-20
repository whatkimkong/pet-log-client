import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";

export default function BasicMenu({ handleShows }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (component) => {
    setAnchorEl(null);
    if (component === "liability") {
      handleShows("liability");
    } else if (component === "health") {
      handleShows("health");
    } else if (component === "log") {
      handleShows("log");
    }
  };

  return (
    <div
      style={{ alignSelf: "flex-end", marginRight: "5vw", marginTop: "3vh" }}
    >
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AddCircleOutlineIcon fontSize="large" sx={{ color: "white" }} />
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
        <MenuItem
          onClick={() => handleClose("liability")}
          sx={{ fontSize: "0.9rem" }}
        >
          Add liability insurance
        </MenuItem>
        <MenuItem
          onClick={() => handleClose("health")}
          sx={{ fontSize: "0.9rem" }}
        >
          Add health insurance
        </MenuItem>
        <MenuItem
          onClick={() => handleClose("log")}
          sx={{ fontSize: "0.9rem" }}
        >
          Add log
        </MenuItem>
      </Menu>
    </div>
  );
}
