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

const EmpLogin = ({ setIsAuthenticated }) => {
  const [step, setStep] = useState("login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [timer, setTimer] = useState(0); // Initialize with 0
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null); // For user activity timeout
  const activityRef = useRef(Date.now()); // Last activity timestamp

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

  // Timer countdown effect
  useEffect(() => {
    let timerInterval;
    if (step === "otpVerification" && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0 && step === "otpVerification") {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval); // Cleanup
  }, [timer, step]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleLoginSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${URL}/api/login`, {
        userName,
        password,
      });
      setUserEmail(response.data.userEmail);
      setStep("emailVerification");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${URL}/api/verify-email`, {
        email: userEmail,
      });
      setStep("otpVerification");
      setTimer(300); // Start a 5-minute timer
      setError("");
    } catch (err) {
      setError("Email verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${URL}/api/verify-otp`, {
        email: userEmail,
        otp,
      });
      alert("Login successful!");
      setIsAuthenticated(true);
      navigate("/updation", { state: { username: userName } });
    } catch (err) {
      setError("Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginAgain = () => {
    setStep("login");
    setUserName("");
    setPassword("");
    setOtp("");
    setError("");
    setTimer(0);
  };

  return (
    <div className="h-screen bg-loginbg backdrop-blur-md bg-no-repeat bg-cover">
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
                  {step === "login" && (
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
                  {step === "emailVerification" && (
                    <>
                      <div className="w-full flex justify-center -mt-5">
                        <img
                          className="w-[80px] bg-white rounded-lg"
                          src={image.tvecertLogo}
                          alt="Logo"
                        />
                      </div>
                      <p className="text-darkblue font-semibold flex justify-center text-[25px]">
                        Verify Email
                      </p>
                      <p className="text-darkblue font-semibold">
                        A verification email will be sent to: {userEmail}
                      </p>
                      {error && (
                        <Typography color="error" variant="body2">
                          {error}
                        </Typography>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleEmailSubmit}
                      >
                        Send OTP
                      </Button>
                    </>
                  )}
                  {step === "otpVerification" && (
                    <>
                      <div className="w-full flex justify-center -mt-5">
                        <img
                          className="w-[80px] bg-white rounded-lg"
                          src={image.tvecertLogo}
                          alt="Logo"
                        />
                      </div>
                      <p className="text-darkblue font-semibold flex justify-center text-[25px]">
                        Enter OTP
                      </p>
                      <Typography variant="body2" gutterBottom>
                        OTP expires in: {formatTime(timer)}
                      </Typography>
                      <TextField
                        label="OTP"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
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
                        onClick={handleOtpSubmit}
                        disabled={timer === 0}
                      >
                        Verify OTP
                      </Button>
                      {timer === 0 && (
                        <button className=" my-4 bg-blue-600 w-full p-2 text-white shadow-md rounded-md"
                          
                          onClick={handleLoginAgain}
                        >
                          Login Again
                        </button>
                      )}
                    </>
                  )}
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
