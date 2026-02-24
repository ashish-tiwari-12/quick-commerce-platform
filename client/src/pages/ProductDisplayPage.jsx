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
import AddToCartButton from '../components/AddToCartButton'

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

  return (
    <section className='bg-gray-50 min-h-screen py-4 lg:py-6'>
      <div className='container mx-auto px-3 lg:px-4'>
        <div className='grid lg:grid-cols-2 gap-4 lg:gap-6'>
          
          {/* LEFT SIDE - IMAGE GALLERY */}
          <div className='space-y-4'>
            {/* Main Product Card */}
            <div className='bg-white rounded-xl shadow-sm p-4 lg:p-6'>
              {/* Main Image */}
              <div className='bg-gray-50 rounded-xl overflow-hidden mb-4'>
                <div className='relative aspect-square flex items-center justify-center'>
                  <img
                    src={data.image[image]}
                    alt={data.name}
                    className='w-full h-full object-contain p-6 lg:p-10'
                  />
                </div>
              </div>

              {/* Image Indicators */}
              {data.image.length > 1 && (
                <div className='flex items-center justify-center gap-2 mb-4'>
                  {data.image.map((img, index) => (
                    <button
                      key={img + index + "point"}
                      onClick={() => setImage(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === image ? "bg-green-600 w-8" : "bg-gray-300 w-2"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Thumbnail Carousel */}
              {data.image.length > 1 && (
                <div className='relative'>
                  <div
                    ref={imageContainer}
                    className='flex gap-3 overflow-x-auto scrollbar-none scroll-smooth'
                  >
                    {data.image.map((img, index) => (
                      <button
                        key={img + index}
                        onClick={() => setImage(index)}
                        className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                          index === image
                            ? "border-green-600 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${data.name} ${index + 1}`}
                          className='w-full h-full object-contain p-1'
                        />
                      </button>
                    ))}
                  </div>

                  {/* Scroll Buttons */}
                  {data.image.length > 4 && (
                    <div className='hidden lg:flex absolute top-1/2 -translate-y-1/2 w-full justify-between pointer-events-none px-0'>
                      <button
                        onClick={handleScrollLeft}
                        className='pointer-events-auto -ml-3 bg-white hover:bg-gray-50 p-2 rounded-full shadow-lg transition-all hover:scale-110'
                      >
                        <FaAngleLeft className='text-gray-700' />
                      </button>
                      <button
                        onClick={handleScrollRight}
                        className='pointer-events-auto -mr-3 bg-white hover:bg-gray-50 p-2 rounded-full shadow-lg transition-all hover:scale-110'
                      >
                        <FaAngleRight className='text-gray-700' />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Product Details Card - Desktop/Tablet */}
            <div className='hidden md:block bg-white rounded-xl shadow-sm p-4 lg:p-6'>
              <h2 className='text-xl font-bold text-gray-900 mb-4'>Product Details</h2>
              <div className='space-y-5'>
                <div>
                  <h3 className='text-base font-semibold text-gray-800 mb-2'>Description</h3>
                  <p className='text-gray-600 leading-relaxed text-sm'>{data.description}</p>
                </div>

                <Divider />

                <div>
                  <h3 className='text-base font-semibold text-gray-800 mb-2'>Unit</h3>
                  <p className='text-gray-600 text-sm'>{data.unit}</p>
                </div>

                {data?.more_details && Object.keys(data?.more_details).length > 0 && (
                  <>
                    <Divider />
                    {Object.keys(data?.more_details).map((element, index) => (
                      <div key={element + index}>
                        <h3 className='text-base font-semibold text-gray-800 mb-2 capitalize'>
                          {element.replace(/_/g, ' ')}
                        </h3>
                        <p className='text-gray-600 text-sm'>{data?.more_details[element]}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - PRODUCT INFO & PURCHASE */}
          <div className='lg:sticky lg:top-24 lg:self-start space-y-4'>
            
            {/* Main Info Card */}
            <div className='bg-white rounded-xl shadow-sm p-4 lg:p-6'>
              
              {/* Delivery Badge */}
              <div className='inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm mb-4'>
                <svg className='w-4 h-4' fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Delivery in 10 minutes
              </div>

              {/* Product Name */}
              <div className='mb-4'>
                <h1 className='text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-2'>
                  {data.name}
                </h1>
                <p className='text-base text-gray-500'>{data.unit}</p>
              </div>

              <Divider />

              {/* Price Section */}
              <div className='my-5'>
                <div className='flex items-baseline gap-3 mb-3'>
                  <span className='text-3xl lg:text-4xl font-bold text-gray-900'>
                    {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
                  </span>
                  
                  {data.discount && (
                    <>
                      <span className='text-lg text-gray-400 line-through'>
                        {DisplayPriceInRupees(data.price)}
                      </span>
                      <span className='bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-sm font-bold'>
                        {data.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className='text-sm text-gray-500'>(Inclusive of all taxes)</p>
              </div>

              {/* Add to Cart Button */}
              <div className='mb-5'>
                {data.stock === 0 ? (
                  <div className='bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center'>
                    <p className='text-red-600 font-bold text-lg'>Out of Stock</p>
                    <p className='text-sm text-red-500 mt-1'>This item is currently unavailable</p>
                  </div>
                ) : (
                  <AddToCartButton data={data} />
                )}
              </div>

              <Divider />

              {/* Return Policy */}
              <div className='bg-blue-50 rounded-lg p-4 mt-5'>
                <div className='flex items-start gap-3'>
                  <svg className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className='font-semibold text-gray-800 text-sm mb-1'>Easy Returns & Refunds</h4>
                    <p className='text-xs text-gray-600'>Return products at doorstep and get refund in seconds.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Shop Section */}
            <div className='bg-white rounded-xl shadow-sm p-4 lg:p-6'>
              <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                <svg className='w-5 h-5 text-green-600' fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Why shop from binkeyit?
              </h3>
              
              <div className='space-y-3'>
                <div className='flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                  <img
                    src={image1}
                    alt='superfast delivery'
                    className='w-12 h-12 flex-shrink-0'
                  />
                  <div>
                    <h4 className='font-semibold text-gray-800 mb-1 text-sm'>Superfast Delivery</h4>
                    <p className='text-xs text-gray-600 leading-relaxed'>
                      Get your order delivered to your doorstep at the earliest from dark stores near you.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                  <img
                    src={image2}
                    alt='Best prices offers'
                    className='w-12 h-12 flex-shrink-0'
                  />
                  <div>
                    <h4 className='font-semibold text-gray-800 mb-1 text-sm'>Best Prices & Offers</h4>
                    <p className='text-xs text-gray-600 leading-relaxed'>
                      Best price destination with offers directly from the manufacturers.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                  <img
                    src={image3}
                    alt='Wide Assortment'
                    className='w-12 h-12 flex-shrink-0'
                  />
                  <div>
                    <h4 className='font-semibold text-gray-800 mb-1 text-sm'>Wide Assortment</h4>
                    <p className='text-xs text-gray-600 leading-relaxed'>
                      Choose from 5000+ products across food, personal care, household & other categories.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details - Mobile Only */}
        <div className='md:hidden bg-white rounded-xl shadow-sm p-4 mt-4'>
          <h2 className='text-lg font-bold text-gray-900 mb-4'>Product Details</h2>
          <div className='space-y-4'>
            <div>
              <h3 className='text-base font-semibold text-gray-800 mb-2'>Description</h3>
              <p className='text-gray-600 leading-relaxed text-sm'>{data.description}</p>
            </div>

            <Divider />

            <div>
              <h3 className='text-base font-semibold text-gray-800 mb-2'>Unit</h3>
              <p className='text-gray-600 text-sm'>{data.unit}</p>
            </div>

            {data?.more_details && Object.keys(data?.more_details).length > 0 && (
              <>
                <Divider />
                {Object.keys(data?.more_details).map((element, index) => (
                  <div key={element + index}>
                    <h3 className='text-base font-semibold text-gray-800 mb-2 capitalize'>
                      {element.replace(/_/g, ' ')}
                    </h3>
                    <p className='text-gray-600 text-sm'>{data?.more_details[element]}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPage