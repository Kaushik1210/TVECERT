// import React from 'react'

// const CountBanner = ({count1,count2,count3,category1,category2,category3}) => {
//   return (
//     <div className=' w-full flex justify-center text-white    '>

//         <div className='w-700 h-28 mx-6 px-5   bg-gradient-to-r from-bannerfrom to-bannerto rounded-lg shadow-3x
//                         max-sm:h-full
//                         max-sm:mx-10
//                         '>

//           <div className='h-full flex justify-around items-center gap-5 
//                           max-sm:flex-col
//                           max-sm:py-5
//                           '>
             
//             <div className=' flex-1 flex items-center gap-2 max-sm:flex-col max-sm:gap-1'>
//               <p className='text-2xl font-semibold'>{count1}</p>
//               <p className='font-medium '>{category1}</p>
//             </div>
//             <div className=' flex-1 flex items-center gap-2 max-sm:flex-col max-sm:gap-1'>
//               <p className='text-2xl font-semibold'>{count2}</p>
//               <p className='font-medium '>{category2}</p>
//             </div>
//             <div className=' flex-1 flex items-center gap-2 max-sm:flex-col max-sm:gap-1'>
//               <p className='text-2xl font-semibold'>{count3}</p>
//               <p className='font-medium '>{category3}</p>
//             </div>

//           </div> 

//         </div>
      
      
//     </div>
//   )
// }

// export default CountBanner

import React, { useEffect, useRef } from 'react';
import Odometer from 'odometer';
import 'odometer/themes/odometer-theme-default.css';
// import './styles.css'; // Include your styles

const CountBanner = ({ count1, count2, count3, category1, category2, category3 }) => {
  const odometer1Ref = useRef(null);
  const odometer2Ref = useRef(null);
  const odometer3Ref = useRef(null);

  useEffect(() => {
    const options = {
      threshold: [0, 1],
    };

    const createOdometer = (el, value) => {
      const odometer = new Odometer({
        el: el,
        value: 0,
      });

      let hasRun = false;

      const callback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun) {
            odometer.update(value);
            hasRun = true;
          }
        });
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(el);

      return () => observer.disconnect();
    };

    const observer1Cleanup = createOdometer(odometer1Ref.current, count1);
    const observer2Cleanup = createOdometer(odometer2Ref.current, count2);
    const observer3Cleanup = createOdometer(odometer3Ref.current, count3);

    return () => {
      observer1Cleanup();
      observer2Cleanup();
      observer3Cleanup();
    };
  }, [count1, count2, count3]);

  return (
    <div className='w-full animate flex justify-center text-white'>
      <div className='w-700 h-28 mx-6 px-5 bg-gradient-to-r from-bannerfrom to-bannerto rounded-lg shadow-3xl
                      max-sm:h-full
                      max-sm:mx-10'>
        <div className='h-full flex justify-between items-center gap-2 
                        max-sm:flex-col
                        max-sm:gap-5
                        max-sm:py-5'>
          <div className='w-full flex-1 flex flex-col items-center  max-sm:flex-col max-sm:gap-1'>
            <div><p className='odometer plus' ref={odometer1Ref}>0</p>+</div>            
            <p className='font-medium'>{category1}</p>
          </div>
          <div className='w-full flex-1 flex flex-col items-center  max-sm:flex-col max-sm:gap-1'>
            <div><p className='odometer plus' ref={odometer2Ref}>0</p>+</div>            
            <p className='font-medium'>{category2}</p>
          </div>
          <div className='w-full flex-1 flex flex-col items-center  max-sm:flex-col max-sm:gap-1'>
            <div><p className='odometer ' ref={odometer3Ref}>0</p>+</div>
            
            <p className='font-medium'>{category3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountBanner;
