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
    }, 1000); // 5 seconds

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
          {/* Uncomment if the navbar should remain static */}
          {/* <div className='absolute top-0 z-50'>
            <HomeNavBar />
          </div> */}
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
