import React, { useEffect, useRef, useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [data, setData] = useState(["","","","","",""])
    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    console.log("location",location)

    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    },[])

    const valideValue = data.every(el => el)

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.verify_forgot_password_otp,
                data : {
                    otp : data.join(""),
                    email : location?.state?.email
                }
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData(["","","","","",""])
                navigate("/reset-password",{
                    state : {
                        data : response.data,
                        email : location?.state?.email
                    }
                })
            }

        } catch (error) {
            console.log('error',error)
            AxiosToastError(error)
        }



    }

    return (
        <section className='w-full min-h-[70vh] flex items-center justify-center px-4 py-8 bg-gradient-to-tr from-primary/5 via-[#F5F3FF] to-[#A78BFA]/10'>
            <div className='bg-white/90 backdrop-blur-md w-full max-w-lg mx-auto rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100/50'>
                <div className='text-center mb-6'>
                    <span className='inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider'>
                        Security Verification ⚡
                    </span>
                    <h2 className='text-3xl font-black text-secondary tracking-tight font-display mb-1.5'>
                        Enter OTP Code
                    </h2>
                    <p className='text-xs lg:text-sm text-gray-500 font-medium'>
                        We've sent a 6-digit verification code to <span className='text-secondary font-bold'>{location?.state?.email}</span>
                    </p>
                </div>

                <form className='grid gap-6 mt-2' onSubmit={handleSubmit}>
                    <div className='grid gap-2'>
                        <label htmlFor='otp' className='text-xs lg:text-sm font-bold text-secondary text-left'>Enter 6-Digit Code</label>
                        <div className='flex items-center gap-2 lg:gap-3 justify-between mt-1'>
                            {
                                data.map((element,index)=>{
                                    return(
                                        <input
                                            key={"otp"+index}
                                            type='text'
                                            id='otp'
                                            ref={(ref)=>{
                                                inputRef.current[index] = ref
                                                return ref 
                                            }}
                                            value={data[index]}
                                            onChange={(e)=>{
                                                const value =  e.target.value
                                                console.log("value",value)

                                                const newData = [...data]
                                                newData[index] = value
                                                setData(newData)

                                                if(value && index < 5){
                                                    inputRef.current[index+1].focus()
                                                }
                                            }}
                                            maxLength={1}
                                            className='bg-[#F5F3FF]/50 w-full aspect-square max-w-12 p-1 border border-purple-100/80 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all text-center font-black text-secondary text-lg'
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
             
                    <button 
                        disabled={!valideValue} 
                        className={`w-full py-3 rounded-xl font-extrabold my-2 tracking-wider text-sm transition-all duration-300 ${valideValue ? "bg-primary hover:bg-primary-hover active:scale-[0.98] hover:shadow-[0_4px_12px_rgba(108,99,255,0.25)] text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    >
                        Verify OTP
                    </button>

                </form>

                <p className='text-xs lg:text-sm text-gray-500 font-medium mt-6 text-center border-t border-purple-50/80 pt-6'>
                    Already have an account? <Link to={"/login"} className='font-bold text-primary hover:text-primary-hover hover:underline transition-colors'>Login Here</Link>
                </p>
            </div>
        </section>
    )
}

export default OtpVerification


