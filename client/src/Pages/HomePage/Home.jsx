import React, { useState, useEffect } from 'react';
import Herosecmainpage from './Herosecmainpage';
import Aboutus from './Aboutus';
import Carrersec from './Carrersec';
import SliderSection from './SliderSection';
import Newsletter from '../../CommonComponents/Newsletter';
import Footer from '../../CommonComponents/Footer';
import HomeNavBar from './HomeNavBar';
import NewsSec from './NewsSec';

const Home = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
    {showLoader ? (
      <div className=' h-screen flex justify-center items-center'>
        <div className="pageLoader"></div>
      </div>
    ) : (
      <>
      <div className="scroll-smooth bg-white">
         
          <Herosecmainpage />
          <Aboutus />
          <SliderSection />
          <Carrersec />
          {/* <Newsletter /> */}
          <NewsSec/>
          <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
