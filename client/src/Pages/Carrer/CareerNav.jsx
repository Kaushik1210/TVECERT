import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const CareerNav = () => {
  return (
    <div className=' flex absolute w-full h-20 bg-gradient-to-b from-navfrom to to-navto '>
      <div className=' flex justify-between items-center w-full ml-5 mr-5'>
       <div>
            <h2 className=' text-35 font-medium text-white '>TVE.</h2>
       </div>

      
        <Link to="/Home">
        <div className='flex gap-2 text-white items-center'>
            <FaArrowLeft />
            <p>Back</p>
        </div>
        </Link>

      </div>
    </div>
  )
}

export default CareerNav
