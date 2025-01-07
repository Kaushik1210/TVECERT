import React from 'react'

const Button = ({text,herf}) => {
  return (
    <div className=' bg-gradient-to-r from-buttonfrom to to-buttonto w-fit h-45 flex items-center rounded-full '>
      <a className='text-white m-10 ' href={herf}>{text}</a>
    </div>
  )
}

export default Button
