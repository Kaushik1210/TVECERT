import React, { useState, useEffect } from "react";
import Policy3 from '../../../CommonComponents/Policy3'
import Footer from '../../../CommonComponents/Footer'
import TCnav from "./TCnav";

const TermsAndConditions = () => {
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
        <div className='bg-white'>
       <TCnav/>
        <div  className=' m-5 p-5 bg-white rounded-lg shadow-xl'>
          
        <Policy3/>
        </div>
        <Footer/>
      </div>
      )}
    </>
    
  )
}

export default TermsAndConditions
