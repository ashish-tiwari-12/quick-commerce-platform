import React from 'react'

const CardLoading = () => {
  return (
    <div className='border py-2 lg:p-4 grid gap-1 lg:gap-3 w-36 lg:w-52 flex-shrink-0 rounded cursor-pointer bg-white transition-all duration-300 hover:shadow-md hover:scale-[1.02] animate-pulse'>
      <div className='min-h-24 bg-blue-50 rounded'>
      </div>
      <div className='p-2 lg:p-3  bg-blue-50 rounded w-20'>
      </div>
      <div className='p-2 lg:p-3 bg-blue-50 rounded'>
      </div>
      <div className='p-2 lg:p-3 bg-blue-50 rounded w-14'>
      </div>

      <div className='flex items-center justify-between gap-3'>
        <div className='p-2 lg:p-3 bg-blue-50 rounded w-20'>
        </div>
        <div className='p-2 lg:p-3 bg-blue-50 rounded w-20'>
        </div>
      </div>

    </div>
  )
}

export default CardLoading