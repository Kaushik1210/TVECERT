import React, { useState, useEffect, useRef } from "react";
import { TbMenu2 } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";

import image from "../../Assets/dummy";

const HomeNavBar = () => {
  const [homeMenu, setHomeMenu] = useState(false); // State for mobile menu toggle
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown toggle
  const menuRef = useRef(null); 
  const dropdownRef = useRef(null);

  useEffect(() => {
    

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setHomeMenu(false); 
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false); 
    }
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
    const newTab = window.open("#/updation", "_blank"); // Updated to use HashRouter
    if (newTab) {
      newTab.document.title = "TVE CERT Employee";
    }
  };

  return (
    <div className="flex absolute w-full h-20 bg-gradient-to-b from-navfrom to-navto z-50">
      <div className="flex justify-between items-center w-full mx-5">
        {/* Logo */}
        <img
          className=" w-[80px]  bg-white rounded-lg "
          src={image.tvecertLogo}
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
          <a
            className="text-16 text-white cursor-pointer"
            onClick={(event) => handleSmoothScroll(event, "aboutus")}
          >
            About us
          </a>
          <div className="relative">
            <button
            ref={dropdownRef}
              className="text-16 flex items-center text-white cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown on click
            >
              Certification Info
              <IoIosArrowDown />
            </button>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 bg-white shadow-lg rounded-md py-2 w-[250px] z-10"
              >
                <Link
                  className="block px-4 py-2 text-darkblue hover:bg-gray-100"
                  to="/certification#certificateinfo"
                  onClick={() => setDropdownOpen(false)}
                >
                  Client's Certificate Info
                </Link>
                <Link
                  className="block px-4 py-2 text-darkblue hover:bg-gray-100"
                  to="/training#delegateinfo"
                  onClick={() => setDropdownOpen(false)}
                >
                  Delegate Certificate Info
                </Link>
              </div>
            )}
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
        </div>

        {/* Login Button for Desktop */}
        <div className="text-white flex gap-2 items-center max-[1024px]:hidden">
          <p onClick={openLoginInNewTab} className="cursor-pointer">
            Login as Employee
          </p>
        </div>

        {/* Menu Toggle Button */}
        <div
          className="relative text-white text-2xl hidden max-[1024px]:block cursor-pointer"
          onClick={() => setHomeMenu(!homeMenu)}
        >
          {homeMenu ? <IoClose /> : <TbMenu2 />}
        </div>

        {/* Mobile Menu */}
        {homeMenu && (
          <div
            ref={menuRef}
            className="absolute text-darkblue flex flex-col font-semibold right-0 top-10 w-[300px] gap-2 px-8 py-10 rounded-2xl m-5 bg-white"
          >
            <a
              className="text-16  cursor-pointer"
              onClick={(event) => handleSmoothScroll(event, "home")}
            >
              Home
            </a>
           
            <Link className="text-16 " to="/certification">
              Certification
            </Link>
            <Link className="text-16 " to="/training">
              Training
            </Link>
            <a
              className="text-16  cursor-pointer"
              onClick={(event) => handleSmoothScroll(event, "aboutus")}
            >
              About us
            </a>
            <div className="relative">
              <button
                className="text-16 flex items-center cursor-pointer w-full text-left"
                onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown on click
              >
                Certification Info<IoIosArrowDown />
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full mt-2 bg-white shadow-lg rounded-md py-2 w-full z-10"
                >
                  <Link
                    className="block px-4 py-2 text-darkblue hover:bg-gray-100"
                    to="/certification#clientsCertificateInfo"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Client's Certificate Info
                  </Link>
                  <Link
                    className="block px-4 py-2 text-darkblue hover:bg-gray-100"
                    to="/training#delegateinfo"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Delegate Certificate Info
                  </Link>
                </div>
              )}
            </div>
            <a
              className="text-16  cursor-pointer"
              onClick={(event) => handleSmoothScroll(event, "career")}
            >
              Career
            </a>
            <a
              className="text-16  cursor-pointer"
              onClick={(event) => handleSmoothScroll(event, "contactus")}
            >
              Contact us
            </a>
            <div className="w-full border my-2" />
            <p
              onClick={() => {
                setHomeMenu(false);
                openLoginInNewTab();
              }}
              className="mt-1 text-blue-600 font-semibold hover:underline-offset-0 cursor-pointer"
            >
              Login as Employee
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeNavBar;
