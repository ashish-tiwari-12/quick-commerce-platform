import React, { useState, useEffect } from 'react'
import { FaRegEyeSlash, FaRegEye, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
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
    
    // Email OTP verification state
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [isSendingOtp, setIsSendingOtp] = useState(false)
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
    const [timer, setTimer] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        let interval = null
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [timer])

    const handleChange = (e) => {
        const { name, value } = e.target

        // If email is changed, reset email verification status
        if (name === "email") {
            setIsEmailVerified(false)
            setIsOtpSent(false)
            setOtp("")
        }

        setData((preve) => ({
            ...preve,
            [name]: value
        }))
    }

    // Step 1: Send OTP to email
    const handleSendOtp = async () => {
        if (!data.email) {
            toast.error("Please enter your email address first")
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.email)) {
            toast.error("Please enter a valid email address")
            return
        }

        try {
            setIsSendingOtp(true)
            const response = await Axios({
                ...SummaryApi.send_registration_otp,
                data: {
                    email: data.email,
                    name: data.name
                }
            })

            if (response.data.error) {
                toast.error(response.data.message)
            } else if (response.data.success) {
                toast.success(response.data.message || "OTP sent to your email!")
                setIsOtpSent(true)
                setTimer(60) // 60s cooldown
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setIsSendingOtp(false)
        }
    }

    // Step 2: Verify OTP
    const handleVerifyOtp = async () => {
        if (!otp || otp.trim().length !== 6) {
            toast.error("Please enter the complete 6-digit OTP")
            return
        }

        try {
            setIsVerifyingOtp(true)
            const response = await Axios({
                ...SummaryApi.verify_registration_otp,
                data: {
                    email: data.email,
                    otp: otp.trim()
                }
            })

            if (response.data.error) {
                toast.error(response.data.message)
            } else if (response.data.success) {
                toast.success("Email verified successfully! ⚡")
                setIsEmailVerified(true)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setIsVerifyingOtp(false)
        }
    }

    // Form validity: must have all fields filled AND email verified
    const isValidForm = data.name && data.email && data.password && data.confirmPassword && isEmailVerified

    // Step 3: Register User in database
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isEmailVerified) {
            toast.error("Please verify your email address before registering")
            return
        }

        if (data.password !== data.confirmPassword) {
            toast.error("Password and confirm password must match")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: {
                    ...data,
                    otp: otp.trim()
                }
            })

            if (response.data.error) {
                toast.error(response.data.message)
            } else if (response.data.success) {
                toast.success(response.data.message || "Registered successfully! Please login.")
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate("/login")
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='w-full min-h-[85vh] flex items-center justify-center px-4 py-8 bg-gradient-to-tr from-primary/5 via-[#F5F3FF] to-[#A78BFA]/10'>
            <div className='bg-white/95 backdrop-blur-md w-full max-w-lg mx-auto rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100/50'>
                <div className='text-center mb-6'>
                    <h2 className='text-3xl font-black text-secondary tracking-tight font-display mb-1.5'>
                        Join <span className='text-primary'>Ashivo</span>
                    </h2>
                </div>

                <form className='grid gap-4 mt-2' onSubmit={handleSubmit}>
                    {/* Full Name */}
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

                    {/* Email Address */}
                    <div className='grid gap-1'>
                        <div className='flex justify-between items-center'>
                            <label htmlFor='email' className='text-xs lg:text-sm font-bold text-secondary text-left'>Email Address</label>
                            {isEmailVerified && (
                                <span className='flex items-center gap-1 text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200'>
                                    <FaCheckCircle className='w-3 h-3' /> Verified
                                </span>
                            )}
                        </div>
                        <input
                            type='email'
                            id='email'
                            disabled={isEmailVerified}
                            className={`p-3 border rounded-xl outline-none transition-all text-sm font-semibold ${
                                isEmailVerified 
                                    ? 'bg-emerald-50/40 border-emerald-300 text-emerald-900 cursor-not-allowed' 
                                    : 'bg-[#F5F3FF]/50 border-purple-100/80 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 text-secondary placeholder-gray-400'
                            }`}
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email address'
                        />

                        {/* Email Verification Action Link / Button Below Email Box */}
                        {!isEmailVerified ? (
                            <div className='mt-1.5'>
                                {!isOtpSent ? (
                                    <div className='flex items-center justify-between'>
                                        <button
                                            type='button'
                                            onClick={handleSendOtp}
                                            disabled={!data.email || isSendingOtp}
                                            className={`inline-flex items-center gap-1.5 text-xs font-bold transition-all ${
                                                !data.email
                                                    ? 'text-gray-400 cursor-not-allowed'
                                                    : 'text-primary hover:text-primary-hover hover:underline cursor-pointer'
                                            }`}
                                        >
                                            <FaPaperPlane className={`w-3 h-3 ${isSendingOtp ? 'animate-pulse' : ''}`} />
                                            {isSendingOtp ? "Sending 6-digit OTP..." : "Verify Email with OTP"}
                                        </button>
                                        
                                        <button
                                            type='button'
                                            onClick={() => setIsOtpSent(true)}
                                            className='text-[11px] font-semibold text-gray-500 hover:text-primary hover:underline cursor-pointer'
                                        >
                                            Already have an OTP?
                                        </button>
                                    </div>
                                ) : (
                                    /* Inline OTP Box when OTP has been sent */
                                    <div className='mt-2 p-4 bg-purple-50/80 border border-purple-200 rounded-2xl animate-in fade-in duration-300'>
                                        <div className='flex items-center justify-between mb-2.5'>
                                            <span className='flex items-center gap-1.5 text-xs font-bold text-purple-950'>
                                                <MdOutlineMailLock className='w-4 h-4 text-primary' /> Enter 6-digit OTP sent to your email
                                            </span>
                                            {timer > 0 ? (
                                                <span className='text-[11px] font-semibold text-gray-500'>
                                                    Resend in <span className='text-primary font-bold'>{timer}s</span>
                                                </span>
                                            ) : (
                                                <button
                                                    type='button'
                                                    onClick={handleSendOtp}
                                                    disabled={isSendingOtp}
                                                    className='text-[11px] font-bold text-primary hover:underline cursor-pointer'
                                                >
                                                    {isSendingOtp ? "Sending..." : "Resend OTP"}
                                                </button>
                                            )}
                                        </div>

                                        <div className='flex gap-2 items-center'>
                                            <input
                                                type='text'
                                                maxLength={6}
                                                autoFocus
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                                placeholder='Enter 6-digit OTP'
                                                className='w-full bg-white px-3 py-2.5 border border-purple-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-center font-mono font-black tracking-[6px] text-secondary text-base placeholder:tracking-normal placeholder:font-sans placeholder:text-xs placeholder:text-gray-400'
                                            />
                                            <button
                                                type='button'
                                                onClick={handleVerifyOtp}
                                                disabled={otp.length !== 6 || isVerifyingOtp}
                                                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                                                    otp.length === 6 && !isVerifyingOtp
                                                        ? 'bg-primary hover:bg-primary-hover text-white shadow-md cursor-pointer active:scale-95'
                                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                }`}
                                            >
                                                {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='flex items-center justify-between text-xs text-emerald-700 font-medium px-1 mt-1'>
                                <span className='flex items-center gap-1 font-bold'>
                                    <FaCheckCircle className='w-3 h-3 text-emerald-600' /> Email confirmed with Ashivo OTP
                                </span>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setIsEmailVerified(false)
                                        setIsOtpSent(false)
                                        setOtp("")
                                    }}
                                    className='text-primary hover:underline font-bold text-[11px] cursor-pointer'
                                >
                                    Change Email
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Password */}
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

                    {/* Confirm Password */}
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

                    {/* Submit Register Button */}
                    <button 
                        type='submit'
                        disabled={!isValidForm} 
                        className={`w-full py-3.5 rounded-xl font-extrabold my-2 tracking-wider text-sm transition-all duration-300 ${
                            isValidForm 
                                ? "bg-primary hover:bg-primary-hover active:scale-[0.98] hover:shadow-[0_4px_12px_rgba(108,99,255,0.25)] text-white cursor-pointer" 
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        {isEmailVerified ? "Complete Registration" : "Verify Email to Register"}
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
