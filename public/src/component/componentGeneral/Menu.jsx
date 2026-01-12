import React, { useState } from "react";
import useMenu from "../../utils/useMenu";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";
import { Menu as MuiMenu, MenuItem } from "@mui/material";

const Menu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuItems = useMenu();
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const activeLinkStyle = {
    borderRadius: "8px",
    border: "1px solid #4FDCEB",
    background: "linear-gradient(180deg, #B7F8F8 0%, #5511F2 100%)",
    padding: "8px 12px", // Add some padding for better visual
    color: "#F0F0F0",
  };

  return (
    <nav className="px-4 py-10">
      <div className="flex justify-between items-center">
        <div className="bg-linear-to-r from-[#0F0C9A] to-[#20ACF7] bg-clip-text text-transparent font-semibold text-[36px] leading-none ">
          <Link to="/">TechVibes</Link>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.link}
              className="menuTextColor"
              style={location.pathname === item.link ? activeLinkStyle : {}}
            >
              {item.label}
            </Link>
          ))}
          <button className={"get-now-btn"}>Get Now</button>
        </div>
        <div className="lg:hidden">
          <button
            onClick={handleClick}
            className="text-white focus:outline-none"
          >
            {anchorEl ? <X /> : <MenuIcon />}
          </button>
          <MuiMenu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                width: "100vw",
                maxWidth: "none",
                left: "0 !important",
                right: "0 !important",
                maxHeight: "calc(100vh - 64px)",
                marginTop: "64px",
              },
            }}
          >
            {menuItems.map((item) => (
              <MenuItem onClick={handleClose} key={item.label}>
                <Link
                  to={item.link}
                  style={location.pathname === item.link ? activeLinkStyle : {}}
                >
                  {item.label}
                </Link>
              </MenuItem>
            ))}
          </MuiMenu>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
