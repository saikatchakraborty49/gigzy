import React from 'react'

const Footer = () => {
  return (
    <div className='bg-richblack-900 text-pure-greys-5 border-t-2 w-full p-2 place-items-center border-richblack-700 '>
        <p>
            Copyright &copy; {new Date().getFullYear()} Gigzy           
        </p>
    </div>
  )
}

export default Footer