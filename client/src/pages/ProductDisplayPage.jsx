import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
// import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data, setData] = useState({
    name: "",
    image: []
  })
  const [image, setImage] = useState(0)
  const [loading, setLoading] = useState(false)
  const imageContainer = useRef()

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }

  console.log("product data", data)

  return (
    <section className='bg-gray-50 min-h-screen py-4 lg:py-8'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
          <div className='grid lg:grid-cols-2 gap-0'>
            {/* Left Side - Images */}
            <div className='p-4 lg:p-8 bg-white border-r border-gray-100'>
              {/* Main Image */}
              <div className='bg-white rounded-2xl border border-gray-100 mb-4 overflow-hidden relative'>
                <div className='aspect-square lg:aspect-[4/3] flex items-center justify-center p-8'>
                  <img
                    src={data.image[image]}
                    alt={data.name}
                    className='w-full h-full object-contain'
                  />
                </div>
                {/* Delivery Badge */}
                <div className='absolute top-4 left-4'>
                  <span className='bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1'>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    10 MINS
                  </span>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className='grid relative'>
                <div ref={imageContainer} className='flex gap-3 z-10 relative w-full overflow-x-auto scrollbar-none scroll-smooth'>
                  {
                    data.image.map((img, index) => {
                      return (
                        <div
                          className={`min-w-[72px] h-[72px] lg:min-w-20 lg:h-20 cursor-pointer rounded-xl border-2 transition-all overflow-hidden ${index === image ? 'border-green-600 shadow-md' : 'border-gray-200 hover:border-gray-300'
                            }`}
                          key={img + index}
                        >
                          <img
                            src={img}
                            alt={`${data.name} view ${index + 1}`}
                            onClick={() => setImage(index)}
                            className='w-full h-full object-contain p-2'
                          />
                        </div>
                      )
                    })
                  }
                </div>
                {data.image.length > 4 && (
                  <div className='w-full h-full hidden lg:flex justify-between absolute items-center px-0'>
                    <button
                      onClick={handleScrollLeft}
                      className='z-10 bg-white hover:bg-gray-50 p-2 rounded-full shadow-lg border border-gray-200 -ml-3 transition-all'
                    >
                      <FaAngleLeft className='text-gray-700' />
                    </button>
                    <button
                      onClick={handleScrollRight}
                      className='z-10 bg-white hover:bg-gray-50 p-2 rounded-full shadow-lg border border-gray-200 -mr-3 transition-all'
                    >
                      <FaAngleRight className='text-gray-700' />
                    </button>
                  </div>
                )}
              </div>

              {/* Product Details - Desktop */}
              <div className='mt-8 hidden lg:block space-y-6'>
                <div className='border-t border-gray-200 pt-6'>
                  <h3 className='text-lg font-bold text-gray-900 mb-4'>Product Details</h3>
                  
                  <div className='space-y-4'>
                    {data.description && (
                      <div>
                        <p className='text-sm font-semibold text-gray-700 mb-1'>Description</p>
                        <p className='text-sm text-gray-600 leading-relaxed'>{data.description}</p>
                      </div>
                    )}
                    
                    {data.unit && (
                      <div>
                        <p className='text-sm font-semibold text-gray-700 mb-1'>Unit</p>
                        <p className='text-sm text-gray-600'>{data.unit}</p>
                      </div>
                    )}
                    
                    {data?.more_details && Object.keys(data?.more_details).map((element, index) => {
                      return (
                        <div key={element + index}>
                          <p className='text-sm font-semibold text-gray-700 mb-1 capitalize'>{element}</p>
                          <p className='text-sm text-gray-600'>{data?.more_details[element]}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className='p-4 lg:p-8'>
              {/* Product Title & Unit */}
              <div className='mb-6'>
                <h1 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight'>
                  {data.name}
                </h1>
                <p className='text-base text-gray-600'>{data.unit}</p>
              </div>

              {/* Price Section */}
              <div className='mb-6 pb-6 border-b border-gray-200'>
                <div className='flex items-center gap-3 flex-wrap'>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-3xl lg:text-4xl font-bold text-gray-900'>
                      {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
                    </span>
                    {data.discount && (
                      <>
                        <span className='text-lg text-gray-400 line-through'>
                          {DisplayPriceInRupees(data.price)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {data.discount && (
                  <div className='mt-2'>
                    <span className='inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-md'>
                      {data.discount}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              {data.stock === 0 ? (
                <div className='mb-6'>
                  <button disabled className='w-full py-4 bg-gray-200 text-gray-500 rounded-xl font-semibold text-base cursor-not-allowed'>
                    Out of Stock
                  </button>
                </div>
              ) : (
                <div className='mb-6'>
                  <button className='w-full py-4 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-xl font-bold text-base transition-all shadow-sm hover:shadow-md'>
                    Add to Cart
                  </button>
                </div>
              )}

              {/* Why Shop Section */}
              <div className='bg-gray-50 rounded-xl p-6 mb-6'>
                <h3 className='text-lg font-bold text-gray-900 mb-4'>Why shop from binkeyit?</h3>
                <div className='space-y-4'>
                  <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0'>
                      <img
                        src={image1}
                        alt='superfast delivery'
                        className='w-14 h-14 object-contain'
                      />
                    </div>
                    <div>
                      <h4 className='font-semibold text-gray-900 text-sm mb-1'>Superfast Delivery</h4>
                      <p className='text-xs text-gray-600 leading-relaxed'>
                        Get your order delivered to your doorstep at the earliest from dark stores near you.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0'>
                      <img
                        src={image2}
                        alt='Best prices offers'
                        className='w-14 h-14 object-contain'
                      />
                    </div>
                    <div>
                      <h4 className='font-semibold text-gray-900 text-sm mb-1'>Best Prices & Offers</h4>
                      <p className='text-xs text-gray-600 leading-relaxed'>
                        Best price destination with offers directly from the manufacturers.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0'>
                      <img
                        src={image3}
                        alt='Wide Assortment'
                        className='w-14 h-14 object-contain'
                      />
                    </div>
                    <div>
                      <h4 className='font-semibold text-gray-900 text-sm mb-1'>Wide Assortment</h4>
                      <p className='text-xs text-gray-600 leading-relaxed'>
                        Choose from 5000+ products across food, personal care, household & other categories.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details - Mobile */}
              <div className='lg:hidden space-y-4 border-t border-gray-200 pt-6'>
                <h3 className='text-lg font-bold text-gray-900 mb-3'>Product Details</h3>
                
                {data.description && (
                  <div>
                    <p className='text-sm font-semibold text-gray-700 mb-1'>Description</p>
                    <p className='text-sm text-gray-600 leading-relaxed'>{data.description}</p>
                  </div>
                )}
                
                {data.unit && (
                  <div>
                    <p className='text-sm font-semibold text-gray-700 mb-1'>Unit</p>
                    <p className='text-sm text-gray-600'>{data.unit}</p>
                  </div>
                )}
                
                {data?.more_details && Object.keys(data?.more_details).map((element, index) => {
                  return (
                    <div key={element + index}>
                      <p className='text-sm font-semibold text-gray-700 mb-1 capitalize'>{element}</p>
                      <p className='text-sm text-gray-600'>{data?.more_details[element]}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPage