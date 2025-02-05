import React from 'react'
import Button from '../../Components/Button'
import image from '../../Assets/dummy'

import { Link } from 'react-router-dom'

const Carrersec = () => {
  return (
    <div id='career' className='relative'>

    <section  className=' mx-100 my-10 relative z-10
                           max-lg:mx-20
                           max-[850px]:mx-14
                           max-sm:mx-6'>
      <div className='flex mb-50 max-[850px]:flex-col'>
        <div className='flex-1 pr-10  content-center'>
          <img className=' rounded-2xl shadow-xl max-[850px]:hidden ' src={image.carrerpic}/>
          
        </div>

        <div className='flex-1 flex justify-center flex-col gap-3 pl-10 border-l
                        max-[850px]:border-none
                        max-[850px]:pl-0'>
            <p className='underline underline-offset-4'>Career</p>
            <p className=' capitalize text-SH font-semibold text-ldarkblue '>Let's grow together.</p>
            <img className=' rounded-2xl shadow-xl hidden max-[850px]:block ' src={image.carrerpic}/>
            <div className=' w-[250px] border border-darkblue hidden max-[850px]:block' />
            <p className=' text-justify flex flex-col gap-2 text-darkblue'>
            We're building a culture at HubSpot where amazing people (like you) can do their best work. If you're ready to grow your career and help millions of organizations grow better, you've come to the right place.
            </p>
            <Link to='/career'><Button text="See all open positions"/>
            </Link>
            
        </div>
      </div>
    </section>

    <div className=' h-[800px] w-[550px] absolute bg-sbguline top-[-100px] left-0 bg-no-repeat max-sm:w-[350px] max-[360px]:w-[250px]' />
    <div className=' h-[800px] w-[550px] absolute bg-sbgdline top-[200px] right-0 bg-no-repeat max-sm:w-[350px] max-[360px]:w-[250px]' />

    </div>
  )
}

export default Carrersec
