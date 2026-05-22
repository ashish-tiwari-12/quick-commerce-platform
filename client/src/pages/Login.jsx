import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserData';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))

                setData({
                    email: "",
                    password: "",
                })

                navigate("/")
            }


        } catch (error) {
            AxiosToastError(error)
        }



    }
    return (
        <section className='w-full min-h-[80vh] flex items-center justify-center px-4 py-8 bg-gradient-to-tr from-primary/5 via-[#F5F3FF] to-[#A78BFA]/10'>
            <div className='bg-white/90 backdrop-blur-md w-full max-w-lg mx-auto rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100/50'>
                <div className='text-center mb-6'>
                    <span className='inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider'>
                        Fast. Fresh. Instant. ⚡
                    </span>
                    <h2 className='text-3xl font-black text-secondary tracking-tight font-display mb-1.5'>
                        Welcome to <span className='text-primary'>Ashivo</span>
                    </h2>
                    <p className='text-xs lg:text-sm text-gray-500 font-medium'>
                        Sign in to access your instant 10-minute deliveries!
                    </p>
                </div>

                <form className='grid gap-4 mt-2' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='email' className='text-xs lg:text-sm font-bold text-secondary text-left'>Email Address</label>
                        <input
                            type='email'
                            id='email'
                            className='bg-[#F5F3FF]/50 p-3 border border-purple-100/80 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all text-sm font-semibold text-secondary placeholder-gray-400'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email address'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <div className='flex justify-between items-center'>
                            <label htmlFor='password' className='text-xs lg:text-sm font-bold text-secondary text-left'>Password</label>
                            <Link to={"/forgot-password"} className='text-xs font-bold text-primary hover:text-primary-hover hover:underline transition-all'>Forgot password?</Link>
                        </div>
                        <div className='bg-[#F5F3FF]/50 p-3 border border-purple-100/80 rounded-xl flex items-center focus-within:bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full bg-transparent outline-none text-sm font-semibold text-secondary placeholder-gray-400'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <button 
                                type='button'
                                onClick={() => setShowPassword(preve => !preve)} 
                                className='cursor-pointer text-gray-400 hover:text-primary transition-colors ml-2'
                            >
                                {
                                    showPassword ? (
                                        <FaRegEye className='w-4 h-4' />
                                    ) : (
                                        <FaRegEyeSlash className='w-4 h-4' />
                                    )
                                }
                            </button>
                        </div>
                    </div>

                    <button 
                        disabled={!valideValue} 
                        className={`w-full py-3 rounded-xl font-extrabold my-2 tracking-wider text-sm transition-all duration-300 ${valideValue ? "bg-primary hover:bg-primary-hover active:scale-[0.98] hover:shadow-[0_4px_12px_rgba(108,99,255,0.25)] text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    >
                        Login
                    </button>

                </form>

                <p className='text-xs lg:text-sm text-gray-500 font-medium mt-6 text-center border-t border-purple-50/80 pt-6'>
                    Don't have an account? <Link to={"/register"} className='font-bold text-primary hover:text-primary-hover hover:underline transition-colors'>Register Now</Link>
                </p>
            </div>
        </section>
    )
}

export default Login
