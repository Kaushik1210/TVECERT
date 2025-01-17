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

     

     

      <CertList6/>

      <div className="w-full flex justify-center">
        <div className="w-[500px] mx-6 border mb-10 border-gray-500" />
      </div>
    </div>
  );
};

export default CertList;
