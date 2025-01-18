import React, { useState, useEffect, useRef } from "react";
import { TbMenu2 } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

// import { FaArrowLeft } from "react-icons/fa";
import image from "../../Assets/dummy";

const CertNav = () => {
  
  
    const [homeMenu, setHomeMenu] = useState(false);
    const menuRef = useRef(null); // Ref for the menu
  
    // Function to handle clicks outside the menu
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setHomeMenu(false); // Close the menu if clicked outside
        }
      };
  
      // Add event listener for clicks outside
      document.addEventListener("mousedown", handleClickOutside);
  
      // Clean up the event listener on component unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
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
            <div className="max-[950px]:hidden flex gap-5">
              
             
              <Link className="text-16 text-white" to="/home">
                Home
              </Link>
              <Link className="text-16 text-white " to="/training">
                Training
              </Link>
             
             
              <Link className="text-16 text-white " to="/career">
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
              <Link className="text-16  " to="/training">
                Training
              </Link>
             
             
              <Link className="text-16  " to="/career">
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

export default CertNav;
