import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import noDataImage from '../assets/nothing here yet.webp'

const SearchPage = () => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  const loadingArrayCard = new Array(10).fill(null)
  const [page,setPage] = useState(1)
  const [totalPage,setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3)

  const fetchData = async() => {
    try {
      setLoading(true)
        const response = await Axios({
            ...SummaryApi.searchProduct,
            data : {
              search : searchText ,
              page : page,
            }
        })

        const { data : responseData } = response

        if(responseData.success){
            if(responseData.page == 1){
              setData(responseData.data)
            }else{
              setData((preve)=>{
                return[
                  ...preve,
                  ...responseData.data
                ]
              })
            }
            setTotalPage(responseData.totalPage)
            console.log(responseData)
        }
    } catch (error) {
        AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchData()
  },[page,searchText])

  console.log("page",page)

  const handleFetchMore = ()=>{
    if(totalPage > page){
      setPage(preve => preve + 1)
    }
  }

  return (
    <section className='bg-white min-h-[75vh]'>
      <div className='container mx-auto px-4 py-6 md:py-8'>
        {/* Premium Results Header */}
        <div className='flex items-center justify-between mb-6 border-b border-purple-50 pb-4'>
          <div>
            <h1 className='text-xl md:text-2xl font-black text-secondary tracking-tight'>
              Search Results
            </h1>
            {searchText && (
              <p className='text-xs md:text-sm text-gray-500 font-medium mt-1'>
                Showing matches for "<span className='text-primary font-bold'>{decodeURIComponent(searchText)}</span>"
              </p>
            )}
          </div>
          <span className='bg-primary/10 text-primary text-xs md:text-sm font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-primary/5'>
            {data.length} {data.length === 1 ? 'item' : 'items'} ✨
          </span>
        </div>

        <InfiniteScroll
              dataLength={data.length}
              hasMore={totalPage > page}
              next={handleFetchMore}
        >
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-3 md:gap-5'>
              {
                data.map((p,index)=>{
                  return(
                    <CardProduct data={p} key={p?._id+"searchProduct"+index}/>
                  )
                })
              }

            {/***loading data */}
            {
              loading && (
                loadingArrayCard.map((_,index)=>{
                  return(
                    <CardLoading key={"loadingsearchpage"+index}/>
                  )
                })
              )
            }
        </div>
        </InfiniteScroll>

              {
                // Premium Empty State
                !data[0] && !loading && (
                  <div className='flex flex-col justify-center items-center w-full min-h-[45vh] mx-auto py-12 text-center px-4'>
                    <div className='w-48 h-48 md:w-56 md:h-56 mb-6 flex items-center justify-center animate-pulse'>
                      <img
                        src={noDataImage} 
                        className='w-full h-full object-contain'
                        alt="No results found"
                      />
                    </div>
                    <h3 className='text-lg md:text-xl font-extrabold text-secondary mb-2'>
                      No products found
                    </h3>
                    <p className='text-xs md:text-sm text-gray-400 font-semibold max-w-sm leading-relaxed mb-4'>
                      Double check the spelling, try a more general term, or search for another item.
                    </p>
                  </div>
                )
              }
      </div>
    </section>
  )
}

export default SearchPage