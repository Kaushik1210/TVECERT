import React, { useState, useRef } from "react";
import { TbMenu2 } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import image from "../../Assets/dummy";
import CloseIcon from "@mui/icons-material/Close";

import {
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Policy1 from "../../CommonComponents/Policy1";
import Policy2 from "../../CommonComponents/Policy2";
import Policy3 from "../../CommonComponents/Policy3";

const TrainingNav = () => {
  const [homeMenu, setHomeMenu] = useState(false);
  const [anchorElCertification, setAnchorElCertification] = useState(null);
  const [anchorElPayment, setAnchorElPayment] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const menuButtonRef = useRef(null);
  const [anchorElTraining, setAnchorElTraining] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageTitle, setModalImageTitle] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

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
  const handleSubmenuClick = (title, imageSrc) => {
    setModalTitle(title);
    setModalContent(
      <img
        src={imageSrc}
        alt={title}
        className=""
        // style={{ minWidth: "1000px", minHeight: "842px" }}
      />
    );
    setOpenModal(true);
    setAnchorElTraining(null);
  };
  const handleTrainingClick = (event) => {
    if (anchorElTraining) {
      setAnchorElTraining(null); // Close menu if it's already open
    } else {
      setAnchorElTraining(event.currentTarget); // Open menu
    }
  };

  const handleTrainingClose = () => {
    setAnchorElTraining(null);
  };

  const openImageModal = (title, imageSrc) => {
    setModalImageTitle(title);
    setModalImageSrc(imageSrc);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImageSrc("");
    setModalImageTitle("");
    setIsZoomed(false); // Reset zoom state
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

          <div>
            <button
              className="text-16 text-white items-center flex cursor-pointer"
              onClick={handleTrainingClick}
            >
              Training Calendar
              <IoIosArrowDown />
            </button>
            <Menu
              anchorEl={anchorElTraining}
              open={Boolean(anchorElTraining)}
              onClose={handleTrainingClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem
                onClick={() =>
                  openImageModal("Lead Auditor Training", image.leadAuditor)
                }
              >
                Lead Auditor Training
              </MenuItem>
              <MenuItem
                onClick={() =>
                  openImageModal("Conversion Training", image.Conversion)
                }
              >
                Conversion Training
              </MenuItem>
              <MenuItem
                onClick={() =>
                  openImageModal("Internal Training", image.Internal)
                }
              >
                Internal Training
              </MenuItem>
              <MenuItem
                onClick={() =>
                  openImageModal(
                    "Auditor Training Transition",
                    image.Transition
                  )
                }
              >
                Auditor Training Transition
              </MenuItem>
            </Menu>
          </div>

          <Modal
            open={isImageModalOpen}
            onClose={closeImageModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={isImageModalOpen}>
              <div className="relative w-full h-full flex items-center justify-center bg-opacity-50">
                <div
                  className="relative bg-darkblue m-2 rounded-lg w-full h-full max-w-[calc(100%-1rem)] max-h-[calc(100%-1rem)] p-4 overflow-hidden"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="w-full flex justify-between items-center">
                    <div
                      className="absolute top-3 right-3 text-white"
                      onClick={closeImageModal}
                    >
                      <IoClose size={24} />
                    </div>
                    <Typography
                      variant="h6"
                      component="h2"
                      className="text-center text-white font-bold mb-4"
                    >
                      {modalImageTitle}
                    </Typography>
                  </div>
                  <div
                    className="m-5  overflow-scroll border border-gray-600
             rounded-r-md [&::-webkit-scrollbar]:w-2
         [&::-webkit-scrollbar-track]:rounded-full
         [&::-webkit-scrollbar-track]:bg-transparent
         [&::-webkit-scrollbar-thumb]:rounded-full
         [&::-webkit-scrollbar-thumb]:bg-gray-300
         dark:[&::-webkit-scrollbar-track]:bg-transparent
         dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  >
                    <img
                      src={modalImageSrc}
                      alt={modalImageTitle}
                      className="  object-contain cursor-pointer transition-transform duration-300"
                      onClick={() => setIsZoomed(!isZoomed)}
                      style={{
                        transform: isZoomed ? "scale(1.5)" : "scale(1)",
                        minWidth: "1000px",
                        minHeight: "842px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>

          <Link className="text-16 text-white" to="/certification">
            Certification
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
            </Menu>
          </div>
          <Link className="text-16 text-white" to="/career">
            Career
          </Link>
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
            <MenuItem>
              <button
                className="text-16  items-center flex cursor-pointer"
                onClick={handleTrainingClick}
              >
                Training Calendar
                <IoIosArrowDown />
              </button>
              <Menu
                anchorEl={anchorElTraining}
                open={Boolean(anchorElTraining)}
                onClose={handleTrainingClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem
                  onClick={() =>
                    openImageModal("Lead Auditor Training", image.leadAuditor)
                  }
                >
                  Lead Auditor Training
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    openImageModal("Conversion Training", image.Conversion)
                  }
                >
                  Conversion Training
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    openImageModal("Internal Training", image.Internal)
                  }
                >
                  Internal Training
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    openImageModal(
                      "Auditor Training Transition",
                      image.Transition
                    )
                  }
                >
                  Auditor Training Transition
                </MenuItem>
              </Menu>
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
              onClick={() => {
                setHomeMenu(false);
              }}
              component={Link}
              to="/career"
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
                <MenuItem
                  onClick={() => handlePolicyClick("Terms & Conditions")}
                >
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

export default TrainingNav;
