import React from 'react'
import CountBanner from '../../CommonComponents/CountBanner'
import CertNav from './CertNav'
import Button from '../../Components/Button'




const CertHeroSec = () => {
  return (
    <>
    
    <div className=' relative h-screen bg-certbg bg-no-repeat w-full bg-cover '>
      <CertNav/>
          <div className=' w-full h-full flex items-center '>
              <div className='ml-100 flex-col
              max-md:justify-center 
              max-md:text-center               
              max-md:m-14 '>
                  <h1 className=' text-H leading-snug text-white font-semibold capitalize'>
                  get certified <br className=' max-md:hidden' />
                  with us 
                   
                   </h1>
                   <p className='w-500 mt-4 text-white text-P font-light
                   max-md:w-full'>
                   We know that finding a meaningful and rewarding career can be a long journey. Our goal is to make that process easy for you and to create a work environment that's enriching—one that you'll look forward to every day.                   </p>
                   <div className='mt-4 flex gap-6 
                   max-md:justify-center                   
                   max-md:items-center
                   max-sm:flex-col'>
                    <a href='#certificateinfo'> <Button text="Certification Info"/>  </a>
                      
                    
                   </div>

              </div>

          </div>
          </div>
          <div className=' -mt-10 relative z-10' >
            <CountBanner
            count1="3,500"
            category1="Certified Companies"
            count2='20'
            category2='Countries'
            count3='40'
            category3='Empaneled Auditors'
            />
          </div>
    </>
  )
}

export default CertHeroSec
