import React from 'react'
import image from "../../Assets/dummy";


const ClientsSec = () => {
  return (
    <div >
      <div className='flex justify-center'>
        <p className='text-center text-24 font-medium '>
          Our Clients
        </p>
      </div>

      <div
            className="flex justify-between mt-5 items-center
                       
                         flex-wrap
                        "
          >
       <img className=" h-12 m-2 " src={image.bahraingalvanizing} alt="" />
       <img className=" h-12 m-2 " src={image.canarabank} alt="" />
       <img className=" h-12 m-2 " src={image.Casagrand} alt="" />
       <img className=" h-12 m-2 " src={image.emco} alt="" />
       <img className=" h-12 m-2 " src={image.emirates} alt="" />
       <img className=" h-12 m-2 " src={image.gastrocare} alt="" />
       <img className=" h-12 m-2 " src={image.holycross} alt="" />
       <img className=" h-12 m-2 " src={image.sriAndal} alt="" />
       <img className=" h-12 m-2 " src={image.madrasNetworking} alt="" />
       <img className=" h-12 m-2 " src={image.muscatsteel} alt="" />
       <img className=" h-12 m-2 " src={image.noormuscat} alt="" />
       <img className=" h-12 m-2 " src={image.NEZOoilfield} alt="" />
       <img className=" h-12 m-2 " src={image.ocentra} alt="" />
       <img className=" h-12 m-2 " src={image.orbitalfarication} alt="" />
       <img className=" h-12 m-2 " src={image.SRIBALAJIMEDICALCOLLEGE} alt="" />
       <img className=" h-12 m-2 " src={image.vkapolymers} alt="" />
      
      </div>
      <div className='w-full mt-20 flex justify-center'>
        <div className='w-[500px] mx-6 border mb-10 border-gray-500' />
      </div>
    </div>
  )
}

export default ClientsSec
