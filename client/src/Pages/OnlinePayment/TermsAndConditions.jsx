import React, { useState, useEffect } from "react";
import OnlinepayNavbar from './OnlinepayNavbar'
import Policy3 from '../../CommonComponents/Policy3'
import Footer from '../../CommonComponents/Footer'

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
        <OnlinepayNavbar/>
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
