import React, { useState, useEffect, useRef } from "react";
import { TbMenu2 } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";

// import { FaArrowLeft } from "react-icons/fa";
import image from "../../Assets/dummy";

const TrainingNav = () => {
  const [homeMenu, setHomeMenu] = useState(false); // State for mobile menu toggle
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown toggle
  const menuRef = useRef(null); // Ref for the menu
  const dropdownRef = useRef(null); // Ref for the dropdown

  // Function to handle clicks outside the menu
  useEffect(() => {
    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setHomeMenu(false); // Close the menu if clicked outside
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false); // Close the dropdown if clicked outside
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

  return (
    <div className="flex absolute w-full h-20 bg-gradient-to-b from-navfrom to-navto z-50">
      <div className="flex justify-between items-center w-full mx-5">
        {/* Logo */}
        <img
          className=" w-[80px]  bg-white rounded-lg "
          src={image.tvecertLogo}
        />

        {/* Desktop Menu */}
        <div className="max-[950px]:hidden flex gap-5">
          <Link className="text-16 text-white" to="/home">
            Home
          </Link>
          <div className="relative">
            <button
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
              </div>
            )}
          </div>

          <Link className="text-16 text-white" to="/certification">
                      Certification
                    </Link>

          <Link className="text-16 text-white" to="/career">
            Career
          </Link>
          <a
            className="text-16 text-white cursor-pointer"
            onClick={(event) => handleSmoothScroll(event, "contactus")}
          >
            Contact us
          </a>
        </div>

        {/* Menu Toggle Button */}
        <div
          className="relative text-white text-2xl hidden max-[950px]:block cursor-pointer"
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
            <Link className="text-16 " to="/home">
            Home
          </Link>
            <div className="relative">
              <button
                className="text-16 flex items-center cursor-pointer w-full text-left"
                onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown on click
              >
                Certification Info
                <IoIosArrowDown />
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full mt-2 bg-white shadow-lg rounded-md py-2 w-full z-10"
                >
                  <Link
                    className="block px-4 py-2 text-darkblue hover:bg-gray-100"
                    to="/certification#certificateinfo"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Client's Certificate Info
                  </Link>
                </div>
              )}
            </div>

            <Link className="text-16" to="/certification">
                        Certification
                      </Link>

           <Link className="text-16 " to="/career">
                          Career
                        </Link>
            <a
              className="text-16  cursor-pointer"
              onClick={(event) => handleSmoothScroll(event, "contactus")}
            >
              Contact us
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingNav;
