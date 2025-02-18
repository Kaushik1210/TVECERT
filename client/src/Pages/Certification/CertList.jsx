import React from "react";
import image from "../../Assets/dummy";
import Button from "../../Components/Button";
import CertList1 from "./CertList/CertList1";
import CertList2 from "./CertList/CertList2";
import CertList3 from "./CertList/CertList3";
import CertList4 from "./CertList/CertList4";
import CertList5 from "./CertList/CertList5";
import CertList6 from "./CertList/CertList6";

const CertList = () => {
  return (
    <div className=" relative">

    <div
      className=" mx-150
    max-lg:mx-20
    max-[850px]:mx-14 
    max-sm:mx-6 relative z-50" 
    >
      <div className=" flex max-[850px]:flex-col max-[850px]:gap-0 gap-4">
        <div className=" flex-1 ">
          <CertList1 />
        </div>
        <div className=" flex-1 ">
          <CertList2 />
        </div>
      </div>

      <div className=" flex max-[850px]:flex-col max-[850px]:gap-0 gap-4">
        <div className=" flex-1 ">
          <CertList3 />
        </div>
        <div className=" flex-1 ">
          <CertList4 />
        </div>
      </div>

      <div className=" flex max-[850px]:flex-col max-[850px]:gap-0 gap-4">
        <div className=" flex-1 ">
          <CertList5 />
        </div>
        <div className=" flex-1 ">
          <CertList6 />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-[500px] mx-6 border mt-10 mb-10 border-gray-500" />
      </div>
    </div>
    <div className=" h-[800px] w-[550px] absolute bg-bbgufill top-0 left-0 bg-no-repeat max-sm:w-[350px] max-[360px]:w-[250px]" />
    <div className=" h-[800px] w-[550px] absolute bg-sbgdline top-[400px] right-0 bg-no-repeat max-sm:w-[350px] max-[360px]:w-[250px] max-sm:top-[600px]" />
    </div>
  );
};

export default CertList;
