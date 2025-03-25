import React, { useState, useEffect } from "react";

import Footer from "../../CommonComponents/Footer";
import OnlinePayHerosec from "./OnlinePayHerosec";
import PaymentPolicyTabs from "./PaymentPolicyTabs";

const OnlinepaymentMain = () => {
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
          <OnlinePayHerosec/>
          <PaymentPolicyTabs/>
          <Footer />
        </div>
      )}
    </>
  );
};

export default OnlinepaymentMain;
