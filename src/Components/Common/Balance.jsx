import React from 'react'
import { FaWallet } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const Balance = () => {
    const {user}=useSelector((state)=>state.profile)
  return (
    <div className='relative group'>
        <FaWallet size={27}/>
        <div className='invisible -translate-x-[4rem] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-1 transition-all duration-500 absolute flex flex-col items-center -z-10 group-hover:visible'>
          <div className='h-[15px] w-[15px] bg-richblack-700 rotate-45'></div>
          <div className='flex flex-col justify-center items-center w-[160px] translate-y-[-7.5px] bg-richblack-700 text-pure-greys-5 p-2 rounded-md'>
            <div className='px-8 py-2 hover:text-yellow-50'>Balance:&nbsp;₹{user.Balance}</div>
            <Link className='px-10 py-2 hover:bg-richblack-800 hover:text-yellow-50' to={"/dashboard/withdraw"}>Withdraw</Link>

            {/* <Link className='px-8 py-2 hover:bg-richblack-800 hover:text-yellow-50' to={"/dashboard/transactions"}>Transactions</Link> */}
          </div>
        </div>
    </div>
  )
}

export default Balance