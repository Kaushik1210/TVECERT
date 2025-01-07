import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  Avatar,
} from "@mui/material";
import {
  PiCertificateBold,
  PiStudentFill,
  PiChalkboardTeacherFill,
} from "react-icons/pi";
import { MdWork } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { SlCalender } from "react-icons/sl";

import image from "../../../Assets/dummy"

const Updation = () => {
  const location = useLocation();
  const { username } = location.state || {};
  const navigate = useNavigate();
  const timeoutRef = useRef(null); // Reference for timeout
  const activityRef = useRef(Date.now()); // Reference for last activity timestamp
  const timeoutDuration = 10 * 60 * 1000; // 2 minutes in milliseconds

  const [anchorEl, setAnchorEl] = useState(null); // For avatar menu
  

  const resetTimeout = () => {
    activityRef.current = Date.now(); // Update activity timestamp
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const currentTime = Date.now();
      if (currentTime - activityRef.current >= timeoutDuration) {
        handleLogout(); // Logout on timeout
      }
    }, timeoutDuration);
  };

  const handleLogout = () => {
    alert("Session expired or logged out. Redirecting to login...");
    navigate("/login", { replace: true }); // Clear history and redirect to login
  };

  useEffect(() => {
    const handleUserActivity = () => resetTimeout();
    document.title = "TVE CERT Employee";

    // Add event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("mousedown", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    resetTimeout(); // Initialize the timeout

    return () => {
      // Cleanup event listeners and timeout
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("mousedown", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className="relative h-full bg-updatebg   bg-no-repeat w-full bg-cover">
      {/* Navbar */}
      <div >
        <div className=" bg-opacity-20 flex justify-between px-4 items-center  backdrop-blur-md">
          <div className=" " >
            <img
                                      className="w-[80px] bg-white rounded-lg"
                                      src={image.tvecertLogo}
                                      alt="Logo"
                                    />
          </div>
          <Tooltip title={username}>
            <IconButton onClick={handleAvatarClick}>
              <Avatar sx={{ bgcolor: "cyan" }}>{username?.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            sx={{ mr: 2 }}
          >
            <MenuItem>
              <Typography variant="body1">{username}</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography variant="body1" color="error">
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Main content */}
      <div className="">
        <div className="h-screen flex flex-col gap-4 justify-center content-center items-center">
          <Link to="/certForm">
            <div
              className="w-[300px] bg-white h-[80px] gap-2 flex justify-center items-center  rounded-xl
             hover:bg-cyan-400 
             hover:text-white
             font-bold
             hover:tracking-wider
             transition ease-in-out duration-500"
            >
              <PiCertificateBold className="text-3xl" />
              <p className="flex">Certification update</p>
            </div>
          </Link>

          <Link to="/delegateForm">
            <div
              className="w-[300px] h-[80px] bg-white gap-2 flex justify-center items-center  rounded-xl
            hover:bg-cyan-500
            hover:text-white
            font-bold
            hover:tracking-wider
            transition ease-in-out duration-500"
            >
              <PiStudentFill className="text-3xl" />
              <p className="flex">Delegates update</p>
            </div>
          </Link>

          <Link to="/carrerUpdate">
            <div
              className="w-[300px] h-[80px] bg-white gap-2 flex justify-center items-center  rounded-xl
             hover:bg-cyan-600 
              hover:text-white
              font-bold
              hover:tracking-wider
              transition ease-in-out duration-500"
            >
              <MdWork className="text-3xl" />
              <p className="flex">Career update</p>
            </div>
          </Link>

          <Link to="/trainingLinkUpdate">
            <div
              className="w-[300px] h-[80px] bg-white gap-2 flex justify-center items-center  rounded-xl
             hover:bg-cyan-700 
              hover:text-white
              font-bold
              hover:tracking-wider
              transition ease-in-out duration-500"
            >
              <PiChalkboardTeacherFill className="text-3xl" />
              <p className="flex">Training Link Update</p>
            </div>
          </Link>

          <Link to="/newsUpdate">
            <div
              className="w-[300px] h-[80px] bg-white gap-2 flex justify-center items-center  rounded-xl
             hover:bg-cyan-800 
              hover:text-white
              font-bold
              hover:tracking-wider
              transition ease-in-out duration-500"
            >
              <ImNewspaper className="text-3xl" />
              <p className="flex">News Update</p>
            </div>
          </Link>

          <Link to="/delegateTrainingCalendar">
            <div
              className="w-[300px] h-[80px] bg-white gap-2 flex justify-center items-center  rounded-xl
             hover:bg-cyan-900 
              hover:text-white
              font-bold
              hover:tracking-wider
              transition ease-in-out duration-500"
            >
              <SlCalender className="text-3xl" />
              <p className="flex">Delegates Training Calendar</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Updation;
