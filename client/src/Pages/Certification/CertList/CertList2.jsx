import React, { useState } from "react";

import image from "../../../Assets/dummy";

import { FaRegArrowAltCircleRight } from "react-icons/fa";

const CertList2 = () => {
  return (
    <>
      <div className=" mt-4  ">
        <div class="relative ">
          <img
            src={image.c2}
            alt="Example"
            className="w-full shadow-xl  rounded-xl h-full object-cover"
          />
          <div class="absolute inset-0 p-2 gap-2 flex flex-col rounded-xl items-start justify-end bg-black bg-opacity-50">
            <p class="text-white capitalize text-2xl font-bold">Appeals</p>
            <a
              className=" "
              href="https://drive.google.com/file/d/1xC8n2Ojse_0gSX4F1TZbVZxvCAeL98jK/view?usp=drive_link"
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

        {/* <div className="flex-1 flex items-center max-md:hidden">
          <img className=" rounded-xl shadow-xl " src={image.c2} alt="" />
        </div> */}
      </div>
    </>
  );
};

export default CertList2;
