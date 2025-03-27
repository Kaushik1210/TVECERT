import React, { useState, useEffect } from "react";
import OnlinepayNavbar from "./OnlinepayNavbar";
import Policy2 from "../../CommonComponents/Policy2";
import Footer from "../../CommonComponents/Footer";

const PrivacyPolicy = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000); // 1 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {showLoader ? (
        <div className="h-screen flex justify-center items-center">
          <div className="pageLoader"></div>
        </div>
      ) : (
        <div className="bg-white">
          <OnlinepayNavbar />
          <div className=" m-5 p-5 bg-white rounded-lg shadow-xl">
            <Policy2 />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default PrivacyPolicy;
