import React from 'react'

const Button2 = ({text,herf}) => {
  return (
    <div className=' cursor-pointer  w-fit h-10 flex items-center rounded-md bg-gray-700 hover:bg-lightblue duration-300 '>
      <a className='text-white m-5 ' href={herf}>{text}</a>
    </div>
  )
}

export default Button2
