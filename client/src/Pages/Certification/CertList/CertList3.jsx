import React, { useState } from "react";

import image from "../../../Assets/dummy";

import { FaRegArrowAltCircleRight } from "react-icons/fa";

const CertList3 = () => {
  return (
    <>
      <div className=" mt-4  ">
        <div class="relative ">
          <img
            src={image.c3}
            alt="Example"
            className="w-full shadow-xl  rounded-xl h-full object-cover"
          />
          <div class="absolute inset-0 p-2 gap-2 flex flex-col rounded-xl items-start justify-end bg-black bg-opacity-50">
            <p class="text-white capitalize text-2xl font-bold">
              certification process
            </p>
            <a
              className=" "
              href="https://drive.google.com/file/d/1ee8bWfr5tu096oPNdJJTaIlx9Xa25ptk/view?usp=drive_link"
              target="_blank"
            >
              <span className="text-white flex items-center gap-3 ">
                {" "}
                <p className=" text-xs">View Process</p>
                <FaRegArrowAltCircleRight />
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertList3;
