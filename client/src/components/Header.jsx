import React, { useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6"
import useMobile from '../hooks/useMobile'
import { BsCart4 } from "react-icons/bs"
// import { useSelector } from 'react-redux'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go"
import { useSelector } from 'react-redux'
import UserMenu from './UserMenu'
function Header() {
    const [isMobile] = useMobile()
    const location = useLocation()
    const navigate = useNavigate()

    const isSearchPage = location.pathname === "/search"
    const user = useSelector((state) => state?.user)
    const [openUserMenu, setOpenUserMenu] = useState(false)

    const redirectToLoginPage = () => {
        navigate("/login")
    }
        const handleCloseUserMenu = ()=>{
        setOpenUserMenu(false)
    }

    const handleMobileUser = ()=>{
        if(!user._id){
            navigate("/login")
            return
        }

        navigate("/user")
    }


    return (
        <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
            {
                !(isSearchPage && isMobile) && (
                    <div className="container mx-auto h-full flex items-center justify-between px-4">

                        {/* Logo */}
                        <Link to={"/"} className="h-full flex items-center">
                            <img
                                src={logo}
                                width={170}
                                height={60}
                                alt="logo"
                                className="hidden lg:block"
                            />
                            <img
                                src={logo}
                                width={120}
                                height={60}
                                alt="logo"
                                className="lg:hidden"
                            />
                        </Link>
                        <div>
                            <Search />
                        </div>

                        {/* Right section */}
                        <div className=''>
                            <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                                <FaRegCircleUser />
                            </button>


                            <div className='hidden lg:flex items-center gap-10 '>

                                {
                                    user?._id ? (
                                        <div className='relative'>
                                            <div
                                                onClick={() => setOpenUserMenu(prev => !prev)}
                                                className='flex items-center gap-2 cursor-pointer'>
                                                    <p>Account</p>
                                                {
                                                    openUserMenu ? (
                                                        <GoTriangleUp />
                                                    ) : (
                                                        <GoTriangleDown />
                                                    )
                                                }

                                            </div>
                                            {
                                                openUserMenu && (
                                                    <div className='absolute right-0 top-16'>
                                                        <div className='bg-white rounded p-4 min-w-52'>
                                                            <UserMenu close={handleCloseUserMenu}/>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    ) : (<button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>)
                                }

                                <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
                                    <div className='animate-bounce'>
                                        <BsCart4 size={26} />
                                    </div>
                                    <div>
                                        <p>My Cart</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }


        </header>
    )
}

export default Header
