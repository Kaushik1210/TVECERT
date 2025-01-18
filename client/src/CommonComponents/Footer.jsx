import React from "react";

import { AiFillLinkedin } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { GiRotaryPhone } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import image from "../Assets/dummy";

const Footer = () => {
  return (
    <footer
      id="contactus"
      className="flex flex-col bg-darkblue text-lwhite px-100 py-50 gap-14
                max-lg:px-20 max-[950px]:px-14 max-sm:px-4"
    >
      {/* Logo and Social Icons */}
      <div className="flex items-center justify-between">
        <div>
          <img
            className="w-[80px] bg-white rounded-lg"
            src={image.tvecertLogo}
            alt="TVE Cert Logo"
          />
        </div>
        <div className="flex gap-8 text-24 z-10">
          <a
            href="https://www.linkedin.com/in/baskaran-venkataramanujam-09370033/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-300"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://www.facebook.com/people/TVE-Certification-Services-Pvt-Ltd/100064146185361/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-300"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/tve_cert/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-300"
          >
            <AiFillInstagram />
          </a>
        </div>
      </div>

      {/* About Text */}
      <div>
        <p className="font-light">
          TVE Certification Services is a well renowned Certification Body to
          provide the Certification Services. <br /> TVE International Academy
          is the globally recognised Training Body in delivering various
          professional Trainings.
        </p>
      </div>

      {/* Contact Information */}
      <div className="flex font-light max-[700px]:flex-col max-[700px]:gap-8">
        <div className="flex flex-1 max-[950px]:flex-col max-[950px]:gap-8">
          <div className="flex flex-1 gap-3 items-center">
            <MdOutlineMailOutline className="text-18" />
            <p>info@tvecert.org</p>
          </div>

          <div className="flex flex-1 gap-3 items-center">
            <FaPhone className="text-18" />
            <p>+91-9361444418</p>
          </div>
        </div>

        <div className="flex flex-1 max-[950px]:flex-col max-[950px]:gap-8">
          <div className="flex flex-1 gap-3 items-center">
            <GiRotaryPhone className="text-18" />
            <p>0431-4051364</p>
          </div>

          <div className="flex flex-1 gap-3 items-center">
            <FaMapMarkedAlt className="text-18" />
            <p>
              Plot No.5, Ganapathy Nagar,
              <br />
              K.K. Nagar, Trichy - 620021,
              <br />
              Tamil Nadu, India.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex max-[950px]:flex-col max-[950px]:gap-12">
        <div className="flex-1 flex max-[700px]:flex-col max-[700px]:gap-12">
          <div className="flex-1 gap-3 flex flex-col">
            <Link
              href="#home"
              className="underline underline-offset-4 text-white hover:text-gray-300"
            >
              Home
            </Link>
          </div>

          <div className="flex-1 gap-3 flex flex-col">
            <Link
              to="/training"
              className="underline underline-offset-4 text-white hover:text-gray-300"
            >
              Training
            </Link>
          </div>
        </div>

        <div className="flex-1 flex max-[700px]:flex-col max-[700px]:gap-12">
          <div className="flex-1 gap-3 flex flex-col">
            <Link
              to="/certification"
              className="underline underline-offset-4 text-white hover:text-gray-300"
            >
              Certification Info
            </Link>
          </div>

          <div className="flex-1 gap-3 flex flex-col">
            {/* <a href="" className="underline underline-offset-4 text-white hover:text-gray-300">
              Online Payment
            </a> */}
            <Link
              to="/training"
              className="underline underline-offset-4 text-white hover:text-gray-300"
            >
              Delegate Certificate Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
