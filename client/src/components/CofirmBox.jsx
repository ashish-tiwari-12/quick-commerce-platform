import React from 'react'
import { IoClose } from "react-icons/io5";

const CofirmBox = ({cancel,confirm,close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800 bg-opacity-40 p-4 flex justify-center items-center animate-fadeIn'>
      <div className='bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl transform transition-all'>
           <div className='flex justify-between items-center gap-3 mb-4'>
                <h1 className='text-xl font-bold text-gray-800'>Permanent Delete</h1>
                <button onClick={close} className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200'>
                    <IoClose size={28} className='text-gray-600' />
                </button>
           </div>
           <p className='text-gray-600 text-base mb-6'>Are you sure you want to permanently delete this item? This action cannot be undone.</p>
           <div className='flex justify-end items-center gap-3'>
                <button onClick={cancel} className='px-6 py-2.5 border-2 rounded-lg border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold transition-all duration-200 hover:shadow-md'>Cancel</button>
                <button onClick={confirm} className='px-6 py-2.5 border-2 rounded-lg border-green-600 bg-green-600 text-white hover:bg-green-700 hover:border-green-700 font-semibold transition-all duration-200 hover:shadow-md'>Confirm</button>
           </div>
      </div>
    </div>
  )
}

export default CofirmBox