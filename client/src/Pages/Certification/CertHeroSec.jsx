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
      <div loading="lazy" className="relative h-screen bg-certbg bg-no-repeat w-full bg-cover">
        <CertNav />
        <div className="w-full h-full flex items-center">
          <div
            className="ml-100 flex-col
              max-md:justify-center 
              max-md:text-center               
              max-md:m-14"
          >
            <h1 className="text-H leading-snug text-white font-semibold ">
              {/* get certified <br className="max-md:hidden" />
              with us */}
              Have a Business breakthrough <br className="max-md:hidden" /> by
              getting Certified with TVE
            </h1>
            <p
              className=" mt-4 text-white text-P font-light
                   max-md:w-full"
            >
              TVE Certification Services is a well-known certification
              organization that certifies companies in a number of ISO
              standards. Our worldwide presence spans over 20
              nations and is growing.
            </p>
            {/* <div
              className="mt-4 flex gap-6 
                   max-md:justify-center                   
                   max-md:items-center
                   max-sm:flex-col"
            >
              <a
                href="#certificateinfo"
                onClick={(event) =>
                  handleSmoothScroll(event, "certificateinfo")
                }
              >
                <Button text="Certification Info" />
              </a>
            </div> */}
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
