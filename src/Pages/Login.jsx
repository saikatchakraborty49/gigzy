import React from 'react'
import LoginForm from '../Components/Core/Auth/LoginForm'
import img from '../Assets/login-image.jpeg'

const Login = () => {
  return (
    <div className='text-white flex flex-col items-center md:flex-row md:justify-around  w-full'>
        <LoginForm/>
        <img className='w-10/12 md:w-5/12 mt-2 md:mt-0' src={img}/>
    </div>
  )
}

export default Login