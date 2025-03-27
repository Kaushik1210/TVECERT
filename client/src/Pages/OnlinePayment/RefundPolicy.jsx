import React, { useState, useEffect } from "react";
import OnlinepayNavbar from './OnlinepayNavbar'
import Policy1 from '../../CommonComponents/Policy1'
import Footer from '../../CommonComponents/Footer'

const RefundPolicy = () => {
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
      <div className=' m-5 p-5 bg-white rounded-lg shadow-xl'>

      <Policy1/>
      </div>
      <Footer/>
    </div>
          )}
        </>
    
  )
}

export default RefundPolicy
