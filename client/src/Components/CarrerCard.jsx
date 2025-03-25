import React from 'react'

import { GoPeople } from "react-icons/go";
import { MdOutlineWorkOutline } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";



const CarrerCard = ({cd}) => {
  return (
    <div className=' h-[600px] max-md:h-auto  max-md:justify-normal bg-white p-4 w-80  max-md:w-full m-5 flex flex-col justify-between   rounded-2xl shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] border-2 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)]  '>

        <div>

        <p className=' h-[50px] max-sm:h-20 text-ldarkblue font-semibold text-xl'>{cd.jobTitle} </p>

        <div className=' my-2 w-[150px]  border border-gray-300 rounded-lg'  />        

        <div className=' h-64  max-md:h-auto max-sm:h-64'>
        <div className='flex cursor-default  max-h-56 items-Start    flex-wrap'>            
           { cd.skill1? <div className=' text-white w-fit font-bold  bg-blue-400 rounded-full text-xs hover:bg-green-400 transition-all ease-in-out duration-100  flex items-center p-2 mr-1 mb-1 mt-1 shadow-md'>{cd.skill1}</div> : null}
           { cd.skill2? <div className=' text-white w-fit font-bold  bg-blue-400 rounded-full text-xs hover:bg-green-400 transition-all ease-in-out duration-100  flex items-center p-2 mr-1 mb-1 mt-1 shadow-md'>{cd.skill2}</div> : null}
           { cd.skill3? <div className=' text-white w-fit font-bold  bg-blue-400 rounded-full text-xs hover:bg-green-400 transition-all ease-in-out duration-100  flex items-center p-2 mr-1 mb-1 mt-1 shadow-md'>{cd.skill3}</div> : null}
           { cd.skill4? <div className=' text-white w-fit font-bold  bg-blue-400 rounded-full text-xs hover:bg-green-400 transition-all ease-in-out duration-100  flex items-center p-2 mr-1 mb-1 mt-1 shadow-md'>{cd.skill4}</div> : null}
           { cd.skill5? <div className=' text-white w-fit font-bold  bg-blue-400 rounded-full text-xs hover:bg-green-400 transition-all ease-in-out duration-100  flex items-center p-2 mr-1 mb-1 mt-1 shadow-md'>{cd.skill5}</div> : null}
           { cd.skill6? <div className=' text-white w-fit font-bold  bg-blue-400 rounded-full text-xs hover:bg-green-400 transition-all ease-in-out duration-100  flex items-center p-2 mr-1 mb-1 mt-1 shadow-md'>{cd.skill6}</div> : null}

        </div>
        </div>
        </div>

        <div>
           <div className=' cursor-default  text-sm flex flex-col gap-2'>
            <div className='' >
                <span className='text-gray-900'>Qualification :</span>
                <p className=' text-gray-500 h-10 max-md:h-auto'>{cd.qualification} </p>
             </div>
            <div className=' flex gap-2 items-center '>
                <GoPeople className='text-gray-900 text-lg font-bold' />
                <p className=' text-gray-500'>{cd.noOfOpenings} opening</p>
            </div>
            <div className=' flex gap-2 items-center '>
                <MdOutlineWorkOutline className='text-gray-900 text-lg font-bold' />
                <p className=' text-gray-500'>{cd.yearsOfExperienceNeeded} </p>
            </div>
            <div className=' flex gap-2 items-center '>
                <SlLocationPin className='text-gray-900 text-lg font-bold' />
                <p className=' text-gray-500'>{cd.district}, {cd.state}, {cd.country}</p>
            </div>
        </div>

        <div className=' w-full flex justify-end mt-1 '>
        <div className='  py-1 px-3 flex rounded-3xl bg-white hover:bg-green-400 hover:text-white transition-all ease-in-out duration-500     '>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfSW2AeJt_7uxmsunrTM-ezfD7vmnVP2Es_GIDydVAbdNldVQ/viewform" target='_blanck' className=' flex justify-center items-center  font-semibold gap-2'>

             <p className='text-sm' >Apply</p>
            <IoIosArrowForward  />
            </a>
        </div>
        </div> 
        </div>



        


      
    </div>
  )
}

export default CarrerCard
