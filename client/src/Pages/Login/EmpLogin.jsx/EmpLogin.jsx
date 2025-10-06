import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../../Assets/dummy";
import { AiFillLinkedin } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { URL } from "../../../constant";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const EmpLogin = ({ setIsAuthenticated }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const activityRef = useRef(Date.now());
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const resetTimeout = () => {
    activityRef.current = Date.now();
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      alert("Session expired due to inactivity. Redirecting to login...");
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    }, 600000); // 10 minutes timeout
  };

  useEffect(() => {
    const handleUserActivity = () => resetTimeout();
    document.title = "TVE CERT Employee";

    // Attach activity event listeners
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("mousedown", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    resetTimeout();

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("mousedown", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleLoginSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${URL}/api/login`, {
        userName,
        password,
      });
      
      // Direct login after successful authentication
      setShowSuccessAlert(true);
      setTimeout(() => {
        setIsAuthenticated(true);
        navigate("/updation", { state: { username: userName } });
      }, 2000);
      
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-loginbg backdrop-blur-md bg-no-repeat bg-cover">
      <div className=" w-full absolute z-20 flex justify-center">
        <div className="  w-[500px]">
          {showSuccessAlert && (
            <Alert
              variant="filled"
              icon={<CheckIcon fontSize="inherit" />}
              severity="success"
            >
              Login successful! Redirecting...
            </Alert>
          )}
        </div>
      </div>
      
      <div className="bg-black h-full w-full bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
        <div className="relative bg-loginbg bg-opacity-50 flex shadow-xl rounded-2xl bg-no-repeat w-[800px] h-[500px] bg-cover">
          <div className="flex-1 flex flex-col justify-center p-4">
            <p className="text-darkblue text-[40px] font-bold">Welcome Back</p>
            <div className="flex gap-3 text-darkblue text-24">
              <a
                href="https://www.linkedin.com/in/baskaran-venkataramanujam-09370033/"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillLinkedin />
              </a>
              <a
                href="https://www.facebook.com/people/TVE-Certification-Services-Pvt-Ltd/100064146185361/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/tve_cert/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillInstagram />
              </a>
            </div>
          </div>
          <div className="flex-1 h-full flex justify-center items-center">
            <div className="bg-opacity-20 backdrop-blur-md flex rounded-r-2xl flex-col justify-center items-center h-full px-8 w-full">
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <div className="w-full flex justify-center -mt-5">
                    <img
                      className="w-[80px] bg-white rounded-lg"
                      src={image.tvecertLogo}
                      alt="Logo"
                    />
                  </div>
                  <p className="text-darkblue font-semibold flex justify-center text-[25px]">
                    Sign in to your account
                  </p>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                  {error && (
                    <Typography color="error" variant="body2">
                      {error}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLoginSubmit}
                  >
                    Login
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpLogin;
