
import React from 'react'
import banner from '../assets/ashivo-banner.png'
import bannerMobile from '../assets/ashivo-banner-mobile.png'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import {Link, useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id,cat)=>{
      console.log(id,cat)
      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.category.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`

      navigate(url)
      console.log("This is url",url)
  }


  return (
   <section className='bg-[#F5F3FF]/30 min-h-screen pb-12'>
      {/* Banner Hero Section */}
      <div className='container mx-auto px-4 py-6 mb-8 md:mb-12'>
          {/* Laptop / Big Screen Banner (Desktop) */}
          <div className='hidden md:block relative w-full h-[320px] lg:h-[400px] xl:h-[450px] rounded-3xl overflow-hidden shadow-md border border-purple-100 hover:shadow-lg transition-shadow duration-300'>
              <img 
                  src={banner} 
                  alt="Ashivo Quick Commerce - Fresh groceries and daily essentials delivered instantly" 
                  className='w-full h-full object-cover object-center'
              />
              {/* Premium overlay text on desktop */}
              <div className='absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center p-12 text-left z-10'>
                  <span className='inline-flex items-center gap-2 bg-primary text-white text-xs font-black px-3.5 py-1.5 rounded-full w-max mb-4 uppercase tracking-widest shadow-sm'>
                      ⚡ FAST. FRESH. INSTANT.
                  </span>
                  <h1 className='text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight mb-4 drop-shadow-sm'>
                      Your Daily Essentials <br/>
                      <span className='bg-gradient-to-r from-accent to-[#C084FC] bg-clip-text text-transparent'>
                          Delivered Instantly.
                      </span>
                  </h1>
                  <p className='text-gray-200 text-sm lg:text-base max-w-md mb-6 leading-relaxed'>
                      Experience the premium quick-commerce app <strong className='text-white font-extrabold'>Ashivo</strong>. Fresh groceries, organic produce, and daily household items at your doorstep in under 10 minutes.
                  </p>
                  <button 
                      onClick={() => {
                          const el = document.getElementById("categories-section");
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }} 
                      className='bg-primary hover:bg-primary-hover text-white text-sm font-black px-8 py-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.03] active:scale-98 w-max shadow-lg shadow-primary/20 hover:shadow-primary/30'
                  >
                      Shop Instantly
                  </button>
              </div>
          </div>

          {/* Mobile / Small Screen Banner with Overlay Text */}
          <div className='block md:hidden relative w-full h-[220px] rounded-2xl overflow-hidden shadow-md border border-purple-100'>
              <img 
                  src={bannerMobile} 
                  alt="Fresh Vegetables and Groceries" 
                  className='w-full h-full object-cover object-center'
              />
              {/* Dark gradient overlay for text readability */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 text-left'>
                  <span className='inline-flex items-center gap-1 bg-primary/95 text-white text-[10px] font-black px-2.5 py-1 rounded-full w-max mb-2 uppercase tracking-wider'>
                      ⚡ 10 Min Delivery
                  </span>
                  <h1 className='text-xl font-black text-white leading-tight mb-1'>
                      Daily Essentials <br/>
                      <span className='text-accent'>Delivered Instantly</span>
                  </h1>
                  <p className='text-gray-200 text-xs line-clamp-2 mb-3'>
                      Get fresh groceries and daily household items at your doorstep under 10 minutes.
                  </p>
                  <button 
                      onClick={() => {
                          const el = document.getElementById("categories-section");
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }} 
                      className='bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-xl transition-transform active:scale-95 w-max shadow-md shadow-primary/20'
                  >
                      Shop Now
                  </button>
              </div>
          </div>
      </div>

      {/* Main Categories Section */}
      <div id="categories-section" className='container mx-auto px-4 mb-12 scroll-mt-24'>
          <div className='flex flex-col mb-8 text-left'>
              <h2 className='text-2xl md:text-3xl font-black text-secondary tracking-tight mb-2'>Shop by Category</h2>
              <p className='text-gray-500 text-sm md:text-base'>Select a category to view fresh and instant essentials</p>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4'>
              {
                loadingCategory ? (
                  new Array(10).fill(null).map((c, index) => {
                    return (
                      <div key={index + "loadingcategory"} className='bg-white rounded-2xl p-4 min-h-36 grid gap-3 shadow-sm border border-purple-50 animate-pulse'>
                        <div className='bg-purple-50 min-h-20 rounded-xl'></div>
                        <div className='bg-purple-50 h-4 rounded-full w-2/3 mx-auto'></div>
                      </div>
                    )
                  })
                ) : (
                  categoryData.map((cat, index) => {
                    return (
                      <div 
                        key={cat._id + "displayCategory"} 
                        className='group bg-white hover:bg-white border border-purple-100 hover:border-primary/30 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col items-center justify-center text-center' 
                        onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                      >
                        <div className='w-16 h-16 md:w-20 md:h-20 bg-primary-light/50 rounded-xl p-2.5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300'>
                            <img 
                              src={cat.image}
                              className='w-full h-full object-contain'
                              alt={cat.name}
                            />
                        </div>
                        <p className='text-xs md:text-sm font-extrabold text-secondary mt-3 group-hover:text-primary transition-colors duration-200 line-clamp-1'>
                            {cat.name}
                        </p>
                      </div>
                    )
                  })
                )
              }
          </div>
      </div>

      {/***display category product */}
      <div className='space-y-12'>
          {
            categoryData?.map((c, index) => {
              return (
                <div key={c?._id + "CategorywiseProductContainer"} className='bg-white py-8 border-y border-purple-100/50 shadow-sm'>
                  <CategoryWiseProductDisplay 
                    id={c?._id} 
                    name={c?.name}
                  />
                </div>
              )
            })
          }
      </div>
   </section>
  )
}

export default Home
