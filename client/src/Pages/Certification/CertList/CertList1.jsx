import React, { useState } from "react";

import image from "../../../Assets/dummy";

import { FaRegArrowAltCircleRight } from "react-icons/fa";

const CertList1 = () => {
  return (
    <>
      <div className="mt-4 ">
        <div class="relative ">
          <img
            src={image.c1}
            alt="Example"
            className="w-full rounded-xl h-full shadow-xl  object-cover"
          />
          <div class="absolute inset-0 p-2 gap-2 flex rounded-xl flex-col items-start justify-end bg-black bg-opacity-50">
            <p class="text-white capitalize text-2xl font-bold">
              Auditing & System Certification
            </p>
            <a
              href="https://drive.google.com/file/d/1JcieFuQUh-2z2wC0MUY6g0MrzGEfBfP_/view?usp=drive_link"
              target="_blank"
            >
              <span className="text-white flex items-center gap-2 ">
                {" "}
                <p className=" text-xs">Read More</p>
                <FaRegArrowAltCircleRight />
              </span>
            </a>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default CertList1;
