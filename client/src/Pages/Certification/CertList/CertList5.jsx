import React, { useState } from "react";

import image from "../../../Assets/dummy";

import { FaRegArrowAltCircleRight } from "react-icons/fa";


const CertList5 = () => {

    const handleClickOpen = () => {
        const link = document.createElement("a");
        link.href = "/pdfs/IMPARTIALITYPOLICY.pdf"; 
        link.download = "Impartiality_Policy_&_Public_Statement.pdf"; 
                document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
 
  return (
    <>
      <div className="  mt-4  ">
              <div class="relative ">
                               <img src={image.c5} alt="Example" className="w-full shadow-xl  rounded-xl h-full object-cover" />
                               <div class="absolute inset-0 p-2 gap-2 flex rounded-xl flex-col items-start justify-end bg-black bg-opacity-50">
                                 <p class="text-white capitalize text-2xl font-bold">Impartiality Policy & Public Statement</p>
                                 <button className=" "
                                     onClick={handleClickOpen}>
                                 <span className="text-white flex items-center gap-3 "> <p className=" text-xs">Read More</p><FaRegArrowAltCircleRight /></span>
                                 
                               </button>
                                 
                               </div>
                             </div>
            </div>
    </>
  );
};

export default CertList5;
