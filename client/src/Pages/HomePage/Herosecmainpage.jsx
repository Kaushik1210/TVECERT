import React from "react";
import HomeNavBar from "./HomeNavBar";
import Button from "../../Components/Button";
import CountBanner from "../../CommonComponents/CountBanner";
import { Link } from "react-router-dom";

const Herosecmainpage = () => {
  return (
    <>
      <div
        id="home"
        loading="lazy"
        className="relative h-screen bg-herobg bg-no-repeat w-full bg-cover z-0"
      >
        <HomeNavBar />
        <div className="w-full h-full flex items-center">
          <div
            className="m-100 flex-col max-md:justify-center max-md:text-center max-md:m-14"
          >
            <h1 className="text-H leading-snug text-white font-semibold">
              An Innovative Approach to Certification and Education
            </h1>
            <p className="w-[420px] mt-4 text-white text-P font-light max-md:w-full">
              TVE Certification Services is a globally recognized certification body
              providing top-tier certification services.
            </p>
            <p className="w-[450px] mt-3 text-white text-P font-light max-md:w-full">
              TVE International Academy is a leading training body delivering
              globally recognized professional training programs.
            </p>
            <div
              className="mt-5 flex gap-6 max-md:justify-center max-md:items-center max-sm:flex-col"
            >
              <Link to="/certification">
                <Button text="Certification" />
              </Link>
              <Link to="/training">
                <Button text="Training" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative -mt-[40px] z-10">
        <CountBanner
          count1="3500"
          category1="Certified Companies"
          count2="15000"
          category2="Certified Professionals"
          count3="20"
          category3="Countries Served"
        />
      </div>
      <meta name="description" content="TVE Certification Services provides globally recognized certifications and professional training programs to help individuals and organizations achieve excellence." />
      <meta name="keywords" content="TVE Certification, Professional Training, Accredited Certifications, Global Certification Body, Training Programs" />
      <meta name="author" content="TVE Certification Services" />
    </>
  );
};

export default Herosecmainpage;
