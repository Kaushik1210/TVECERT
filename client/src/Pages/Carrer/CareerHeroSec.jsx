import React from "react";
import Button from "../../Components/Button";
import CountBanner from "../../CommonComponents/CountBanner";
import CareerNav from "./CareerNav";

const CareerHeroSec = () => {
  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        loading="lazy"
        className="relative h-screen bg-careerherobg bg-no-repeat w-full bg-cover"
      >
        <CareerNav />
        <div className="w-full h-full flex items-center">
          <div
            className="ml-100 flex-col
              max-md:justify-center 
              max-md:text-center               
              max-md:m-14"
          >
            <h1 className="text-[35px] text-white font-semibold capitalize">
              Prosper with Us: <br /> Grow Your Career While Shaping Global
              Standards
              <br className="max-md:hidden" />
            </h1>
            <p
              className="w-500 mt-4 text-white text-P font-light
                   max-md:w-full"
            >
              What We Offer:
            </p>
            <li
              className="w-500 mt-1 indent-2 text-white text-P font-light
                   max-md:w-full"
            >
              Thriving Career Growth
            </li>
            <li
              className="w-500 mt-1 indent-2 text-white text-P font-light
                   max-md:w-full"
            >
              Collaborative Work Culture
            </li>
            <li
              className="w-500 mt-1 indent-2 text-white text-P font-light
                   max-md:w-full"
            >
              Prosperous Future
            </li>
            <p
              className="w-500 mt-1  text-white text-P font-light
                   max-md:w-full"
            >
              Join Us Today! Explore our current openings and become a part of
              the TVE Groups.
            </p>
            <div
              className="mt-4 flex gap-6 
                   max-md:justify-center                   
                   max-md:items-center
                   max-sm:flex-col"
            >
              <a
                href="#careerList"
                onClick={(event) => handleSmoothScroll(event, "careerList")}
              >
                <Button text="View Open Roles" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-10 relative z-10">
        <CountBanner
          count1="20"
          category1="Countries"
          count2="40"
          category2="Empaneled Tutors"
          count3="40"
          category3="Empaneled Auditors"
        />
      </div>
    </>
  );
};

export default CareerHeroSec;
