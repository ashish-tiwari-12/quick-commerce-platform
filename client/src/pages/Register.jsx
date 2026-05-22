import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

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


    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(data.password !== data.confirmPassword){
            toast.error(
                "password and confirm password must be same"
            )
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name : "",
                    email : "",
                    password : "",
                    confirmPassword : ""
                })
                navigate("/login")
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }
    return (
        <section className='w-full min-h-[85vh] flex items-center justify-center px-4 py-8 bg-gradient-to-tr from-primary/5 via-[#F5F3FF] to-[#A78BFA]/10'>
            <div className='bg-white/90 backdrop-blur-md w-full max-w-lg mx-auto rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100/50'>
                <div className='text-center mb-6'>
                    <span className='inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider'>
                        Start Your Journey ⚡
                    </span>
                    <h2 className='text-3xl font-black text-secondary tracking-tight font-display mb-1.5'>
                        Join <span className='text-primary'>Ashivo</span>
                    </h2>
                    <p className='text-xs lg:text-sm text-gray-500 font-medium'>
                        Create an account for blazing fast 10-minute grocery delivery!
                    </p>
                </div>

                <form className='grid gap-4 mt-2' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='name' className='text-xs lg:text-sm font-bold text-secondary text-left'>Full Name</label>
                        <input
                            type='text'
                            id='name'
                            autoFocus
                            className='bg-[#F5F3FF]/50 p-3 border border-purple-100/80 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all text-sm font-semibold text-secondary placeholder-gray-400'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your full name'
                        />
                    </div>
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
                        <label htmlFor='password' className='text-xs lg:text-sm font-bold text-secondary text-left'>Password</label>
                        <div className='bg-[#F5F3FF]/50 p-3 border border-purple-100/80 rounded-xl flex items-center focus-within:bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full bg-transparent outline-none text-sm font-semibold text-secondary placeholder-gray-400'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Create a strong password'
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
                    <div className='grid gap-1'>
                        <label htmlFor='confirmPassword' className='text-xs lg:text-sm font-bold text-secondary text-left'>Confirm Password</label>
                        <div className='bg-[#F5F3FF]/50 p-3 border border-purple-100/80 rounded-xl flex items-center focus-within:bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                className='w-full bg-transparent outline-none text-sm font-semibold text-secondary placeholder-gray-400'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Confirm your password'
                            />
                            <button 
                                type='button'
                                onClick={() => setShowConfirmPassword(preve => !preve)} 
                                className='cursor-pointer text-gray-400 hover:text-primary transition-colors ml-2'
                            >
                                {
                                    showConfirmPassword ? (
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
                        Register
                    </button>

                </form>

                <p className='text-xs lg:text-sm text-gray-500 font-medium mt-6 text-center border-t border-purple-50/80 pt-6'>
                    Already have an account? <Link to={"/login"} className='font-bold text-primary hover:text-primary-hover hover:underline transition-colors'>Login Here</Link>
                </p>
            </div>
        </section>
    )
}

export default Register      

