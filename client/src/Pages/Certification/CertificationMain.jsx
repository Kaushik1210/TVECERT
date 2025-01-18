import React, { useState, useEffect } from "react";
import CertHeroSec from "./CertHeroSec";
import Newsletter from "../../CommonComponents/Newsletter";
import Footer from "../../CommonComponents/Footer";
import CertList from "./CertList";
import CertInfoSec from "./CertInfoSec";

const CertificationMain = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000); // 2 seconds

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
          <CertHeroSec />
          <CertList />
          <CertInfoSec />
          {/* <Newsletter /> */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CertificationMain;
