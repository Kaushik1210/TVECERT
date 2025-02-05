import React from "react";
import TrainingNav from "./TrainingNav";
import CountBanner from "../../CommonComponents/CountBanner";
import Button from "../../Components/Button";

const TrainingHero = () => {
  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div loading="lazy" className="relative h-screen bg-trainbg bg-no-repeat w-full bg-cover">
        <TrainingNav />
        <div className="w-full h-full flex items-center">
          <div
            className="ml-100 flex-col
              max-md:justify-center 
              max-md:text-center               
              max-md:m-14"
          >
            <h1 className="text-H leading-snug text-white font-semibold capitalize">
            A NEW WAY TO CAREER GROWTH...<br/>LEARN & GET CERTIFIED WITH TVE...
            </h1>
            <p
              className="w-500 mt-4 text-white text-P font-light
                   max-md:w-full"
            >
              TVE International Academy is the globally recognised Training Body in delivering various professional Trainings like the CQI and IRCA Certified Trainings,  Exemplar Global Approved Trainings, Health & Safety Trainings etc., Join our pool of 15000+ TVE Students Community & share your knowledge in our exclusive TVE Community Portal.
            </p>
            <div
              className="mt-4 flex gap-6 
                   max-md:justify-center                   
                   max-md:items-center
                   max-sm:flex-col"
            >
              {/* <a
                href="#delegateinfo"
                onClick={(event) => handleSmoothScroll(event, "delegateinfo")}
              >
                <Button text="Delegate Certificate Info" />
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-10 relative z-10">
        <CountBanner
          count1="15,000"
          category1="Students"
          count2="20"
          category2="Countries"
          count3="50"
          category3="Empaneled Tutors"
        />
      </div>
    </>
  );
};

export default TrainingHero;
