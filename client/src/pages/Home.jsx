
import React from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
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
      {/* Premium Rebranded Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-br from-secondary via-[#1E1B4B] to-[#0F172A] text-white py-16 lg:py-24 px-4 mb-12 shadow-inner border-b border-purple-950/20'>
          {/* Glowing background shapes */}
          <div className='absolute top-0 right-0 w-96 h-96 bg-primary opacity-20 blur-[120px] rounded-full pointer-events-none animate-pulse'></div>
          <div className='absolute bottom-0 left-0 w-72 h-72 bg-accent opacity-15 blur-[100px] rounded-full pointer-events-none'></div>

          <div className='container mx-auto relative z-10 max-w-6xl'>
              <div className='grid lg:grid-cols-12 gap-12 items-center'>
                  {/* Left Column: Heading and Taglines */}
                  <div className='lg:col-span-7 space-y-6 text-left'>
                      <div className='inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-accent px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wide animate-pulse shadow-sm'>
                          <span className='flex h-2 w-2 relative'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75'></span>
                            <span className='relative inline-flex rounded-full h-2 w-2 bg-accent'></span>
                          </span>
                          ⚡ Fast. Fresh. Instant.
                      </div>
                      
                      <h1 className='text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white'>
                          Your Daily Essentials <br/>
                          <span className='bg-gradient-to-r from-accent to-[#C084FC] bg-clip-text text-transparent'>
                              Delivered Instantly.
                          </span>
                      </h1>
                      
                      <p className='text-gray-300 text-base md:text-lg max-w-lg leading-relaxed'>
                          Experience the premium quick-commerce app **Ashivo**. Get fresh groceries, organic produce, and daily household items at your doorstep in under 10 minutes.
                      </p>

                      <div className='flex flex-wrap gap-4 pt-2'>
                          <button onClick={() => {
                              const el = document.getElementById("categories-section");
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }} className='button-glow bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-primary/20 text-sm'>
                              Shop Instantly
                          </button>
                          <div className='hidden sm:flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm'>
                              <div className='text-accent font-black text-xl'>10 Min</div>
                              <div className='text-xs text-gray-400 leading-tight'>Average<br/>Delivery Time</div>
                          </div>
                      </div>
                  </div>

                  {/* Right Column: Decorative Illustration / Glowing Floating Card */}
                  <div className='lg:col-span-5 hidden lg:block relative'>
                      <div className='w-full aspect-square rounded-3xl bg-gradient-to-tr from-primary/30 to-accent/20 p-8 flex items-center justify-center border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-sm'>
                          <div className='absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-30 blur-2xl animate-pulse'></div>
                          <div className='relative bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl w-72 backdrop-blur-md transform hover:rotate-2 transition-all duration-500 hover:scale-105'>
                              <div className='flex justify-between items-center mb-6'>
                                  <div className='h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent'>⚡</div>
                                  <div className='bg-success/20 text-success px-2 py-0.5 rounded text-xs font-bold'>ACTIVE</div>
                              </div>
                              <div className='h-3 w-32 bg-white/20 rounded-full mb-3'></div>
                              <div className='h-3 w-48 bg-white/20 rounded-full mb-8'></div>
                              <div className='flex justify-between items-center'>
                                  <div className='h-6 w-16 bg-white/20 rounded-full'></div>
                                  <div className='h-8 w-24 bg-primary rounded-xl button-glow'></div>
                              </div>
                          </div>
                      </div>
                  </div>
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
