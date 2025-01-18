import React, { useState, useEffect } from "react";
import CareerHeroSec from "./CareerHeroSec";
import CareerCardSec from "./CareerCardSec";
import Footer from "../../CommonComponents/Footer";

const CareerMain = () => {
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
          <CareerHeroSec />
          <CareerCardSec />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CareerMain;
