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
        className=" relative h-screen bg-herobg  bg-no-repeat w-full bg-cover z-0 "
      >
        <HomeNavBar />
        <div className=" w-full h-full flex items-center  ">
          <div
            className="m-100 flex-col 
              max-md:justify-center 
              max-md:text-center               
              max-md:m-14 "
          >
            <h1 className=" text-H leading-snug text-white font-semibold">
              A New Way To Learn <br className=" max-md:hidden" />& Get
              Certified
            </h1>
            <p
              className="w-500 mt-4 text-white text-P font-light
                   max-md:w-full"
            >
              fkdjsnfsdnf skdfjksdf sdfjsdf dsjfsd fjdsf sdjfsdkf jsdff dslf
              flsdfjkdsg dsgjsd fsdjfsd fjsdflj sdfjnsdlkfselirfes gfesjghsbg
              sdfnskdjgksnfjshef eljflsegjbsje bglssgs kgksjekgnk snrgknsrng
              nsgnsnjgh gjsmngsj bgfmsng fnjsbg jbfjb ,vskdjfksdngvsd.
            </p>
            <div
              className="mt-4 flex gap-6 
                   max-md:justify-center                   
                   max-md:items-center
                   max-sm:flex-col"
            >
              <Link to="/certification">
                {" "}
                <Button text="Certification" />{" "}
              </Link>

              <Link to="/training">
                {" "}
                <Button text="Training" />{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" relative -mt-[40px] z-10 ">
        <CountBanner
          count1="4000"
          category1="Certified Companies"
          count2="15000"
          category2="Students"
          count3="15"
          category3="Countries Global Presence"
        />
      </div>
    </>
  );
};

export default Herosecmainpage;
