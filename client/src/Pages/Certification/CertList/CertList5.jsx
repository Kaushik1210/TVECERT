import React, { useState } from "react";

import image from "../../../Assets/dummy";

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
      <div className=" my-10 flex">
              <div className="flex-1 flex items-center max-md:hidden">
                <img className=" rounded-xl shadow-xl" src={image.c5} alt="" />
              </div>
              <div className="flex-1 flex justify-center flex-col gap-3 pl-10 py-5 max-md:pl-0">
                <p className=" capitalize text-35 font-semibold text-ldarkblue ">
                  Impartiality Policy & Public Statement
                </p>
                <img
                  className=" rounded-xl hidden shadow-xl max-md:block"
                  src={image.c5}
                  alt=""
                />
                <p className=" text-justify flex flex-col gap-2 text-darkblue">
                  We're building a culture at HubSpot where amazing people (like you)
                  can do their best work. If you're ready to grow your career and help
                  millions of organizations grow better, you've come to the right
                  place.
                </p>
                <button
                onClick={handleClickOpen}
            className="bg-gradient-to-r from-buttonfrom to to-buttonto w-fit h-45 flex items-center rounded-full"
            
          >
            <span className="text-white m-10">View Process</span>
          </button>
              </div>
            </div>
    </>
  );
};

export default CertList5;
