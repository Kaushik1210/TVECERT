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

const OnlinepayNavbar = () => {
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



  const handleSmoothScroll = (event, href) => {
    event.preventDefault();
    const targetElement = document.getElementById(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setHomeMenu(false); // Close menu after scrolling
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
        <div className="max-[1150px]:hidden flex gap-5">
         
          <Link className="text-16 text-white" to="/home">
            Home
          </Link>
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

      

        {/* Mobile Menu Button */}
        <div
          sx={{
            color: "white",
            fontSize: "2rem",
            display: { xs: "block", md: "none" },
          }}
          className="  relative min-[1150px]:hidden text-white text-2xl"
          ref={menuButtonRef}
          onClick={() => setHomeMenu(!homeMenu)}
        >
          {homeMenu ? <IoClose /> : <TbMenu2 />}
        </div>

        {homeMenu && (
  <Menu
    anchorEl={menuButtonRef.current}
    open={Boolean(homeMenu)}
    onClose={() => setHomeMenu(false)}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    PaperProps={{
      sx: {
        width: "200px",
        borderRadius: "12px",
        mt: 1,
      },
    }}
  >
   
    <MenuItem
      onClick={() => {
        setHomeMenu(false);
      }}
      component={Link}
      to="/home"
    >
      Home
    </MenuItem>
    <MenuItem
      onClick={() => {
        setHomeMenu(false);
      }}
      component={Link}
      to="/certification"
    >
      Certification
    </MenuItem>
    <MenuItem
      onClick={() => {
        setHomeMenu(false);
      }}
      component={Link}
      to="/training"
    >
      Training
    </MenuItem>
   
    <MenuItem>
            <button
              className="text-16 items-center flex cursor-pointer"
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
          </MenuItem>
    
    <MenuItem
      onClick={(event) => {
        handleSmoothScroll(event, "contactus");
        setHomeMenu(false);
      }}
    >
      Contact Us
    </MenuItem>
  
  </Menu>
)}

       
      </div>

   
    </div>
  );
};

export default OnlinepayNavbar;
