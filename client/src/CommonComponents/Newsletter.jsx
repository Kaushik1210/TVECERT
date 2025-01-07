import React from 'react'

const Newsletter = () => {
  return (
    <>
    <div id='contactus' className=' bg-newsletter w-[100%] bg-cover flex  bg-no-repeat relative z-10   '>
      <div className='flex mx-100 my-40 w-full  bg-gradient-to-r from-bannerfrom to-bannerto rounded-lg shadow-3xl
                      max-lg:mx-20
                      max-[900px]:mx-14
                      max-sm:mx-4
                      max-[850px]:flex-col'>
        <div className='flex-1 m-12 text-white max-[850px]:mb-5 max-[850px]:m-10 '>
            <p>Newsletter</p>
            <p>Be the first one to know  about discounts, offers and events</p>
        </div>

        <div className='flex-1 m-12 flex justify-center items-center max-[850px]:mt-5
                      max-[850px]:m-10 max-sm:flex-col max-sm:items-start'>
            <div className=' w-full flex items-center content-center bg-newsblue rounded-xl ' >
                <input className='flex-1 mx-5 bg-transparent outline-none text-white max-[850px]:h-10' type="email" placeholder='Enter your email' />
                <button className='flex-0 m-2 p-2 text-bannerfrom rounded-lg max-[850px]:hidden   bg-white' >Submit</button>
            </div>       
                <button className='flex-0 m-2 p-2 text-bannerfrom rounded-xl hidden max-[850px]:block max-sm:mt-2 max-sm:m-0   bg-white' >Submit</button>

        </div>
      </div>
    </div>
    </>
  )
}

export default Newsletter
