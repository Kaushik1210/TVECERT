import React, { useState, useRef } from "react";
import { TbMenu2 } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import image from "../../Assets/dummy";
import CloseIcon from "@mui/icons-material/Close";

import {
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const CareerNav = () => {
  const [homeMenu, setHomeMenu] = useState(false);
  const [anchorElCertification, setAnchorElCertification] = useState(null);
  const [anchorElPayment, setAnchorElPayment] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const menuButtonRef = useRef(null);

  const handleCertificationClick = (event) => {
    setAnchorElCertification(event.currentTarget);
  };

  const handleCertificationClose = () => {
    setAnchorElCertification(null);
  };

  const handlePaymentClick = (event) => {
    setAnchorElPayment(event.currentTarget);
  };

  const handlePaymentClose = () => {
    setAnchorElPayment(null);
  };

  const handleSmoothScroll = (event, href) => {
    event.preventDefault();
    const targetElement = document.getElementById(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setHomeMenu(false);
    }
  };

  const openLoginInNewTab = () => {
    const newTab = window.open("#/updation", "_blank");
    if (newTab) {
      newTab.document.title = "TVE CERT Employee";
    }
  };

 
 

  return (
    <div className="flex absolute w-full h-20 bg-gradient-to-b from-navfrom to-navto z-50">
      <div className="flex justify-between items-center w-full mx-5">
        {/* Logo */}
        <img
          className="w-[80px] bg-white rounded-lg"
          src={image.tvecertLogo}
          alt="Logo"
        />

        {/* Desktop Menu */}
        <div className="max-[1024px]:hidden flex gap-5">
          <a
            className="text-16 text-white cursor-pointer"
            onClick={(event) => handleSmoothScroll(event, "home")}
          >
            Home
          </a>
          <Link className="text-16 text-white" to="/certification">
            Certification
          </Link>
          <Link className="text-16 text-white" to="/training">
            Training
          </Link>
          
          <div>
            <button
              className="text-16 text-white items-center flex cursor-pointer"
              onClick={handleCertificationClick}
            >
              Certification Info
              <IoIosArrowDown />
            </button>
            <Menu
              anchorEl={anchorElCertification}
              open={Boolean(anchorElCertification)}
              onClose={handleCertificationClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem
                onClick={handleCertificationClose}
                component={Link}
                to="/certification#certificateinfo"
              >
                Client's Certificate Info
              </MenuItem>
              <MenuItem
                onClick={handleCertificationClose}
                component={Link}
                to="/training#delegateinfo"
              >
                Delegate Certificate Info
              </MenuItem>
            </Menu>
          </div>
          
          <a
            className="text-16 text-white cursor-pointer"
            onClick={(event) => handleSmoothScroll(event, "contactus")}
          >
            Contact us
          </a>
         
        </div>

        {/* Login Button for Desktop */}
       

        {/* Mobile Menu Button */}
        <IconButton
          sx={{
            color: "white",
            fontSize: "2rem",
            display: { xs: "block", md: "none" },
          }}
          ref={menuButtonRef}
          onClick={() => setHomeMenu(!homeMenu)}
        >
          {homeMenu ? <IoClose /> : <TbMenu2 />}
        </IconButton>

        {/* Mobile Dropdown Menu */}
        <Menu
          anchorEl={menuButtonRef.current}
          open={homeMenu}
          onClose={() => setHomeMenu(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem component={Link} to="/home">
            Home
          </MenuItem>
          <MenuItem component={Link} to="/certification">
            Certification
          </MenuItem>
          <MenuItem component={Link} to="/training">
            Training
          </MenuItem>
         
          <MenuItem onClick={handleCertificationClick}>
                      Certification Info
                      <IoIosArrowDown />
                    </MenuItem>
         
          <MenuItem onClick={(event) => handleSmoothScroll(event, "contactus")}>
            Contact us
          </MenuItem>
          
        </Menu>
      </div>

      
    </div>
  );
};

export default CareerNav;
