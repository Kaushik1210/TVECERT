import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const NewsUpdateNav = () => {
  return (
    <div>
      <div className=' flex  w-full h-20  '>
      <div className=' flex justify-between items-center w-full ml-5 mr-5'>
       <div>
            <h2 className=' text-35 font-medium employeelogin '>TVE.</h2>
       </div>

      
        <Link to="/updation">
        <div className='flex gap-2 employeelogin items-center'>
            <FaArrowLeft />
            <p>Back</p>
        </div>
        </Link>

      </div>
    </div>
    </div>
  )
}

export default NewsUpdateNav
