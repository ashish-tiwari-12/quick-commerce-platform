import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';


const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage,setIsSearchPage] = useState(false)
    const [ isMobile ] = useMobile()
    const params = useLocation()
    const searchText = new URLSearchParams(params.search).get("q") || ""
    const [searchVal, setSearchVal] = useState(searchText)

    useEffect(()=>{
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    },[location])

    useEffect(() => {
        setSearchVal(searchText)
    }, [searchText])


    const redirectToSearchPage = ()=>{
        navigate("/search")
    }

    const handleOnChange = (e)=>{
        const value = e.target.value
        setSearchVal(value)
        const url = `/search?q=${value}`
        navigate(url)
    }

  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-xl border border-purple-100/70 overflow-hidden flex items-center text-neutral-500 bg-purple-50/30 hover:bg-purple-50/50 focus-within:bg-white group focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300 shadow-sm'>
        <div>
            {
                (isMobile && isSearchPage ) ? (
                    <Link to={"/"} className='flex justify-center items-center h-full p-2.5 m-1 text-primary bg-primary/5 rounded-full hover:bg-primary/10 transition-colors'>
                        <FaArrowLeft size={18}/>
                    </Link>
                ) :(
                    <button className='flex justify-center items-center h-full p-3 text-neutral-400 group-focus-within:text-primary transition-colors'>
                        <IoSearch size={22}/>
                    </button>
                )
            }
        </div>
        <div className='w-full h-full pr-4'>
            {
                !isSearchPage ? (
                     //not in search page
                     <div onClick={redirectToSearchPage} className='w-full h-full flex items-center text-sm font-medium text-neutral-400 pl-1 cursor-pointer select-none'>
                        <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search "milk"',
                                    1000, 
                                    'Search "bread"',
                                    1000,
                                    'Search "sugar"',
                                    1000,
                                    'Search "panner"',
                                    1000,
                                    'Search "chocolate"',
                                    1000,
                                    'Search "curd"',
                                    1000,
                                    'Search "rice"',
                                    1000,
                                    'Search "egg"',
                                    1000,
                                    'Search "chips"',
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                     </div>
                ) : (
                     //when in search page
                     <div className='w-full h-full flex items-center'>
                        <input
                            type='text'
                            placeholder='Search for atta, dal, pepper and more...'
                            autoFocus
                            value={searchVal}
                            className='bg-transparent w-full h-full outline-none text-secondary font-semibold placeholder-gray-400 text-sm pl-1'
                            onChange={handleOnChange}
                        />
                     </div>
                )
            }
        </div>
        
    </div>
  )
}

export default Search