import React, { useState } from "react";

import image from "../../../Assets/dummy";
import Button from "../../../Components/Button";

const CertList6 = () => {
  return (
    <div>
      <div className=" my-10 flex">
        <div className="flex-1 flex items-center max-md:hidden">
          <img className=" rounded-xl shadow-xl" src={image.c7} alt="" />
        </div>
        <div className="flex-1 flex justify-center flex-col gap-3 pl-10 py-5 max-md:pl-0">
          <p className=" capitalize text-35 font-semibold text-ldarkblue ">
            Obligation of certified client
          </p>
          <img
            className=" rounded-xl shadow-xl hidden max-md:block"
            src={image.c7}
            alt=""
          />
          <p className=" text-justify flex flex-col gap-2 text-darkblue">
            We're building a culture at HubSpot where amazing people (like you)
            can do their best work. If you're ready to grow your career and help
            millions of organizations grow better, you've come to the right
            place.
          </p>
          <a className="bg-gradient-to-r from-buttonfrom to to-buttonto w-fit h-45 flex items-center rounded-full" href="https://drive.google.com/file/d/1OkKpYaeSNv3szqkoNI6uXOqiniLE7s6l/view?usp=drive_link">
            <span className="text-white m-10">View Process</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CertList6;
