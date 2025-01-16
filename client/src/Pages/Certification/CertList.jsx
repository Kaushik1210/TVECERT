import React from "react";
import image from "../../Assets/dummy";
import Button from "../../Components/Button";
import CertList1 from "./CertList/CertList1";
import CertList2 from "./CertList/CertList2";
import CertList3 from "./CertList/CertList3";
import CertList4 from "./CertList/CertList4";
import CertList5 from "./CertList/CertList5";

const CertList = () => {
  return (
    <div
      className="mx-100
    max-lg:mx-20
    max-[850px]:mx-14
    max-sm:mx-6"
    >
      <CertList1 />
      <div className="w-full flex justify-center">
        <div className="w-[500px] mx-6 border mb-10 border-gray-500" />
      </div>

      <CertList2 />

      <div className="w-full flex justify-center">
        <div className="w-[500px] mx-6 border mb-10 border-gray-500" />
      </div>

      <CertList3/>

      

      <div className="w-full flex justify-center">
        <div className="w-[500px] mx-6 border mb-10 border-gray-500" />
      </div>
      <CertList4/>

     

      <div className="w-full flex justify-center">
        <div className="w-[500px] mx-6 border mb-10 border-gray-500" />
      </div>

      <CertList5/>

      <div className="w-full flex justify-center">
        <div className="w-[500px] mx-6 border mb-10 border-gray-500" />
      </div>

      <div className="animate-appear timeline-view timeline-range my-10 flex">
        <div className="flex-1 flex justify-center flex-col gap-3 p-10 py-5 max-md:p-0">
          <p className=" capitalize text-35 font-semibold text-ldarkblue ">
            Transition plan From <br />
            <span className=" text-xl">ISO 9001:2008 to ISO 9001:2015</span>
          </p>
          <img
            className=" rounded-xl shadow-xl hidden max-md:block"
            src={image.c6}
            alt=""
          />
          <p className=" text-justify flex flex-col gap-2 text-darkblue">
            We're building a culture at HubSpot where amazing people (like you)
            can do their best work. If you're ready to grow your career and help
            millions of organizations grow better, you've come to the right
            place.
          </p>
          <Button text="View Process" />
        </div>
        <div className="flex-1 flex items-center max-md:hidden">
          <img className=" rounded-xl shadow-xl" src={image.c6} alt="" />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-[500px] mx-6 border mb-10 border-gray-500" />
      </div>

      <div className="animate-appear timeline-view timeline-range my-10 flex">
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
          <Button text="Read More" />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-[500px] mx-6 border mb-10 border-gray-500" />
      </div>
    </div>
  );
};

export default CertList;
