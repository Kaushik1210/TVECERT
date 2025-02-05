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
import Policy1 from "../../CommonComponents/Policy1";
import Policy2 from "../../CommonComponents/Policy2";
import Policy3 from "../../CommonComponents/Policy3";

const HomeNavBar = () => {
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
      setHomeMenu(false); // Close menu after scrolling
    }
  };

  const openLoginInNewTab = () => {
    const newTab = window.open("#/updation", "_blank");
    if (newTab) {
      newTab.document.title = "TVE CERT Employee";
    }
  };

  const handlePolicyClick = (policy) => {
    let content = "";
    let title = "";
    if (policy === "Refund Policy") {
      content = (
        <Policy1/>
      );
      title = "Refund Policy";
    } else if (policy === "Privacy Policy") {
      content = (
        <Policy2/>
      );
      title = "Privacy Policy";
    } else if (policy === "Terms & Conditions") {
      content = (
       <Policy3/>
      );

      title = "Terms & Conditions";
    }
    setModalContent(content);
    setModalTitle(title);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalContent("");
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
          <a
            className="text-16 text-white  cursor-pointer"
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
          <a
            className="text-16 text-white cursor-pointer"
            onClick={(event) => handleSmoothScroll(event, "aboutus")}
          >
            About us
          </a>
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
            onClick={(event) => handleSmoothScroll(event, "career")}
          >
            Career
          </a>
          <a
            className="text-16 text-white cursor-pointer"
            onClick={(event) => handleSmoothScroll(event, "contactus")}
          >
            Contact us
          </a>
          <div>
            <button
              className="text-16 flex text-white items-center cursor-pointer"
              onClick={handlePaymentClick}
            >
              Online Payment
              <IoIosArrowDown />
            </button>
            <Menu
              anchorEl={anchorElPayment}
              open={Boolean(anchorElPayment)}
              onClose={handlePaymentClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={() => handlePolicyClick("Refund Policy")}>
                Refund Policy
              </MenuItem>
              <MenuItem onClick={() => handlePolicyClick("Privacy Policy")}>
                Privacy Policy
              </MenuItem>
              <MenuItem onClick={() => handlePolicyClick("Terms & Conditions")}>
                Terms & Conditions
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* Login Button for Desktop */}
        <div className="text-white flex gap-2 items-center max-[1150px]:hidden">
          <p onClick={openLoginInNewTab} className="cursor-pointer">
            Login as Employee
          </p>
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
      onClick={(event) => {
        handleSmoothScroll(event, "home");
        setHomeMenu(false);
      }}
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
    <MenuItem
      onClick={(event) => {
        handleSmoothScroll(event, "aboutus");
        setHomeMenu(false);
      }}
    >
      About Us
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
        handleSmoothScroll(event, "career");
        setHomeMenu(false);
      }}
    >
      Career
    </MenuItem>
    <MenuItem
      onClick={(event) => {
        handleSmoothScroll(event, "contactus");
        setHomeMenu(false);
      }}
    >
      Contact Us
    </MenuItem>
    <MenuItem>
            <button
              className="text-16 flex  items-center cursor-pointer"
              onClick={handlePaymentClick}
            >
              Online Payment
              <IoIosArrowDown />
            </button>
            <Menu
              anchorEl={anchorElPayment}
              open={Boolean(anchorElPayment)}
              onClose={handlePaymentClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={() => handlePolicyClick("Refund Policy")}>
                Refund Policy
              </MenuItem>
              <MenuItem onClick={() => handlePolicyClick("Privacy Policy")}>
                Privacy Policy
              </MenuItem>
              <MenuItem onClick={() => handlePolicyClick("Terms & Conditions")}>
                Terms & Conditions
              </MenuItem>
            </Menu>
          </MenuItem>
  </Menu>
)}

       
      </div>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <div className="flex justify-between">
            <p className="font-bold text-darkblue">{modalTitle}</p>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                // position: "absolute",
                // right: 8,
                // top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>

        {/* Dialog Content */}

        <div
          className="  h-full  overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300"
        >
          <div
            className="m-5  overflow-scroll 
      rounded-r-md [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          >
            {modalContent}
          </div>
        </div>

       
      </Dialog>
    </div>
  );
};

export default HomeNavBar;
