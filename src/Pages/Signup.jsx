import React from 'react'
import img from '../Assets/signup-image.jpg'
import SignupForm from '../Components/Core/Auth/SignupForm'

const Signup = () => {
  return (
    <div className='text-white flex flex-col items-center md:flex-row md:justify-around  w-full'>
        <SignupForm/>
        <img className='w-10/12 md:w-5/12' src={img}/>
    </div>
  )
}

export default Signup