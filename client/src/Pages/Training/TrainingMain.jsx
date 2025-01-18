import React, { useState, useEffect } from "react";
import TrainingHero from "./TrainingHero";
import Newsletter from "../../CommonComponents/Newsletter";
import Footer from "../../CommonComponents/Footer";
import TrainingList from "./TrainingList";
import DelegateInfo from "./DelegateInfo";
// import List from './List';

const TrainingMain = () => {
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
          <TrainingHero />
          <TrainingList />
          <DelegateInfo/>
          {/* <List /> */}
          {/* <Newsletter /> */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default TrainingMain;

