import React from 'react'
import Button from '../../Components/Button'
import image from '../../Assets/dummy'








 
const Aboutus = () => {
  return (
    <div className='relative'>
    <section id='aboutus' className=' animate relative mx-100  my-50
                                      max-lg:mx-20
                                      max-[850px]:mx-14
                                      max-sm:mx-6
                                      '>

      {/* aboutus  */}
      <div className='flex mb-50 gap-5
                      max-[850px]:flex-col'>
        <div className='flex-1 pr-10  content-center'>
          <p className='underline underline-offset-4'>About us</p>
          <p className=' capitalize text-SH font-semibold text-ldarkblue '>a world-class company
in the field of Certification & 
registration services.</p>
          <div className=' w-[250px] border border-darkblue hidden max-[850px]:block' />
        </div>
        
        <div className='flex-1 flex flex-col gap-3 pl-10 border-l 
                        max-[850px]:border-none
                        max-[850px]:pl-0'>
        <div className=' text-justify flex flex-col gap-2 text-darkblue'>
          <li>TVE is one of the leading  fast growing Certification bodies in India.</li>
          <li>TVE is offering the Certification Services in India and across the globe.</li>
          <li>TVE has its own regional assessors throughout India and has operations World Wide.TVE Auditors are highly qualified with huge industrial  Audit Experience. They are Professional in their approach.</li>
          <li>TVE understands the importance of impartiality in carrying out its Management System Certification activities. Manages conflict of interest  ensures the objectivity of the Management System Certification activities.</li>
        </div>
        <div className='flex max-sm:justify-center'>
        <Button  text="More About TVE"/>
        </div>
        </div>
      </div>

      {/* our partners */}
      <div> 
        <p className='flex justify-center text-24  font-medium'>Our Partners</p>
        <div className='flex justify-between mt-5 items-center
                        max-[850px]:flex-col  
                        max-[850px]:gap-10  
                        '>
          <img className='h-45 ' src={image.ias} alt="" />
          <img className='h-45 ' src={image.iaf} alt="" />
          <img className='h-45 ' src={image.cqiirca} alt="" />
          <img className='h-45 ' src={image.eg} alt="" />
          <img className='h-45 ' src={image.eosh} alt="" />
        </div>
      </div>

      


    </section>

    <div className=' h-[800px] w-[550px] absolute bg-bbgufill top-0 left-0 bg-no-repeat max-sm:w-[350px] max-[360px]:w-[250px]' />
    <div className=' h-[800px] w-[550px] absolute bg-sbgdline top-[400px] right-0 bg-no-repeat max-sm:w-[350px] max-[360px]:w-[250px] max-sm:top-[600px]' />
    
        
      
    </div>
  )
}

export default Aboutus
