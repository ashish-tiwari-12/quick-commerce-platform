import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])

  console.log("This is allsubCategory", AllSubCategory)

  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]


  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductdata()
  }, [params])


  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
    <section className='bg-gray-50 min-h-screen'>
      <div className='container mx-auto px-2 md:px-4'>
        <div className='flex gap-2 md:gap-4'>
          {/**sub category sidebar **/}
          <div className='w-20 md:w-48 lg:w-64 flex-shrink-0'>
            <div className='sticky top-24 lg:top-20'>
              <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
                <div className='max-h-[calc(100vh-120px)] overflow-y-auto scrollbarCustom'>
                  {
                    DisplaySubCatory.map((s, index) => {
                      const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`
                      return (
                        <Link 
                          key={s._id}
                          to={link} 
                          className={`flex flex-col md:flex-row items-center gap-2 md:gap-3 p-2 md:p-3 border-b border-gray-100
                            hover:bg-green-50 transition-colors duration-200
                            ${subCategoryId === s._id ? "bg-green-100 border-l-4 border-l-green-600" : ""}
                          `}
                        >
                          <div className='w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-gray-50 rounded-lg p-1 flex items-center justify-center'>
                            <img
                              src={s.image}
                              alt={s.name}
                              className='w-full h-full object-contain'
                            />
                          </div>
                          <p className='text-[10px] md:text-sm lg:text-base text-center md:text-left font-medium text-gray-700 line-clamp-2'>
                            {s.name}
                          </p>
                        </Link>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>

          {/**Product section **/}
          <div className='flex-1 min-w-0'>
            <div className='sticky top-24 lg:top-20 z-10 bg-white rounded-lg shadow-sm mb-4 p-3 md:p-4'>
              <h3 className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 capitalize'>
                {subCategoryName}
              </h3>
            </div>

            <div className='bg-white rounded-lg shadow-sm p-2 md:p-4'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4'>
                {
                  data.map((p, index) => {
                    return (
                      <CardProduct
                        data={p}
                        key={p._id + "productSubCategory" + index}
                      />
                    )
                  })
                }
              </div>

              {
                loading && (
                  <div className='py-8'>
                    <Loading />
                  </div>
                )
              }

              {
                !loading && data.length === 0 && (
                  <div className='text-center py-12'>
                    <p className='text-gray-500 text-lg'>No products found in this category</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListPage