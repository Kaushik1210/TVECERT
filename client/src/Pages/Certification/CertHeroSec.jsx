import React from "react";
import CountBanner from "../../CommonComponents/CountBanner";
import CertNav from "./CertNav";
import Button from "../../Components/Button";

const CertHeroSec = () => {
  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <head>
        <title>TVE Certification Services | Get Certified with Global Standards</title>
        <meta name="description" content="Get ISO certified with TVE Certification Services. We offer globally recognized certifications in ISO 9001, ISO 14001, ISO 45001, and more across 15+ countries." />
        <meta name="keywords" content="ISO certification, TVE Certification Services, ISO 9001, ISO 14001, ISO 45001, ISO 22000, business certification, accredited certification body" />
      </head>
      <div loading="lazy" className="relative h-screen bg-certbg bg-no-repeat w-full bg-cover">
        <CertNav />
        <div className="w-full h-full flex items-center">
          <div
            className="ml-100 flex-col
              max-md:justify-center 
              max-md:text-center               
              max-md:m-14"
          >
            <h1 className="text-H leading-snug text-white font-semibold">
              Have a Business Breakthrough <br className="max-md:hidden" /> by
              Getting Certified with TVE
            </h1>
            <p
              className="w-[450px] mt-4 text-white text-P font-light
                   max-md:w-full"
            >
              TVE Certification Services is a renowned certification body that certifies businesses in various ISO standards, including ISO 9001, ISO 14001, ISO 45001, and ISO 22000. Our global reach spans over 15+ countries and is continuously growing.
            </p>
          </div>
        </div>
      </div>
      <div className="-mt-10 relative z-10">
        <CountBanner
          count1="3,500"
          category1="Certified Companies"
          count2="20"
          category2="Countries"
          count3="40"
          category3="Empaneled Auditors"
        />
      </div>
    </>
  );
};

export default CertHeroSec;
