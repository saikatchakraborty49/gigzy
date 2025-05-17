import React from 'react'
import { MdDelete } from "react-icons/md";


const DeleteBtn = (onclick) => {
  return (
    <button onClick={onclick} className='bg-[#e31010] py-2 px-2 rounded-md hover:scale-105 hover:font-bold'>
        <MdDelete fontSize={24} />
    </button>
  )
}

export default DeleteBtn