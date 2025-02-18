import React, { useState } from "react";

import image from "../../../Assets/dummy";
import { FaRegArrowAltCircleRight } from "react-icons/fa";


const CertList6 = () => {
  return (
    <div>
      <div className=" mt-4  ">
        <div class="relative ">
                 <img src={image.c7} alt="Example" className="w-full h-full shadow-xl  rounded-xl object-cover" />
                 <div class="absolute inset-0 p-2 gap-2 flex flex-col rounded-xl items-start justify-end bg-black bg-opacity-50">
                   <p class="text-white capitalize text-2xl font-bold">Obligation of certified client</p>
                   <a className=" "
                        href="https://drive.google.com/file/d/1OkKpYaeSNv3szqkoNI6uXOqiniLE7s6l/view?usp=drive_link">
                   <span className="text-white flex items-center gap-2 "> <p className=" text-xs">Read More</p><FaRegArrowAltCircleRight /></span>
                   
                 </a>
                   
                 </div>
               </div>
          {/* <p className=" text-justify flex flex-col gap-2 text-darkblue">
            We're building a culture at HubSpot where amazing people (like you)
            can do their best work. If you're ready to grow your career and help
            millions of organizations grow better, you've come to the right
            place.
          </p> */}
          {/* <a className="bg-gradient-to-r from-buttonfrom to to-buttonto w-fit h-45 flex items-center rounded-full" href="https://drive.google.com/file/d/1OkKpYaeSNv3szqkoNI6uXOqiniLE7s6l/view?usp=drive_link">
            <span className="text-white m-10">View Process</span>
          </a> */}
        
      </div>
    </div>
  );
};

export default CertList6;
