import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({data}) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`
    const [loading,setLoading] = useState(false)
  
  return (
    <Link to={url} className='group relative bg-white hover:bg-white border border-purple-100 hover:border-primary/20 p-3 lg:p-4 flex flex-col gap-2 rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 w-full min-w-[144px] lg:min-w-[208px]' >
      {/* Product Image Wrapper */}
      <div className='w-full aspect-square bg-[#F5F3FF]/40 rounded-xl overflow-hidden mb-1 p-2.5 flex items-center justify-center relative group-hover:bg-[#F5F3FF]/65 transition-colors duration-300'>
            <img 
                src={data.image[0]}
                alt={data.name}
                className='w-full h-full object-contain group-hover:scale-105 transition-transform duration-300'
            />
      </div>

      {/* Badges Section */}
      <div className='flex flex-wrap items-center gap-1.5 mb-1.5'>
        <div className='rounded-full text-[10px] lg:text-xs font-bold px-2 py-0.5 text-primary bg-primary/10 flex items-center gap-1'>
            10 Min ⚡
        </div>
        {
          Boolean(data.discount) && (
            <div className='rounded-full text-[10px] lg:text-xs font-bold px-2 py-0.5 text-success bg-success/15'>
                {data.discount}% OFF
            </div>
          )
        }
      </div>

      {/* Product Information */}
      <div className='font-extrabold text-secondary text-xs lg:text-sm line-clamp-2 h-8 lg:h-10 text-left leading-tight group-hover:text-primary transition-colors duration-200'>
        {data.name}
      </div>
      <div className='text-xs text-gray-500 font-semibold text-left'>
        {data.unit} 
      </div>

      {/* Price & Add to Cart Layout */}
      <div className='flex items-center justify-between gap-1.5 mt-auto pt-2 border-t border-purple-50/50'>
        <div className='flex flex-col text-left'>
          {
            Boolean(data.discount) && (
              <span className='text-[10px] lg:text-xs text-gray-400 line-through leading-none mb-0.5'>
                  {DisplayPriceInRupees(data.price)}
              </span>
            )
          }
          <span className='text-sm lg:text-base font-black text-secondary leading-none'>
              {DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))} 
          </span>
        </div>

        <div className='flex-shrink-0'>
          {
            data.stock == 0 ? (
              <span className='inline-block bg-red-50 text-red-600 border border-red-100 text-[10px] lg:text-xs font-extrabold px-2.5 py-1.5 rounded-lg'>
                  Out of Stock
              </span>
            ) : (
              <AddToCartButton data={data} />
            )
          }
        </div>
      </div>

    </Link>
  )
}

export default CardProduct