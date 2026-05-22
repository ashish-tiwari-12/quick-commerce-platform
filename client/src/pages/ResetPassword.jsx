import React, { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'

const ResetPassword = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [data,setData] = useState({
    email : "",
    newPassword : "",
    confirmPassword : ""
  })
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)

  const valideValue = Object.values(data).every(el => el)

  useEffect(()=>{
    if(!(location?.state?.data?.success)){
        navigate("/")
    }

    if(location?.state?.email){
        setData((preve)=>{
            return{
                ...preve,
                email : location?.state?.email
            }
        })
    }
  },[])

  const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

  console.log("data reset password",data)

  const handleSubmit = async(e)=>{
    e.preventDefault()

    ///optional 
    if(data.newPassword !== data.confirmPassword){
        toast.error("New password and confirm password must be same.")
        return
    }

    try {
        const response = await Axios({
            ...SummaryApi.resetPassword, //change
            data : data
        })
        
        if(response.data.error){
            toast.error(response.data.message)
        }

        if(response.data.success){
            toast.success(response.data.message)
            navigate("/login")
            setData({
                email : "",
                newPassword : "",
                confirmPassword : ""
            })
            
        }

    } catch (error) {
        AxiosToastError(error)
    }



}

  return (
    <section className='w-full min-h-[75vh] flex items-center justify-center px-4 py-8 bg-gradient-to-tr from-primary/5 via-[#F5F3FF] to-[#A78BFA]/10'>
        <div className='bg-white/90 backdrop-blur-md w-full max-w-lg mx-auto rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100/50'>
            <div className='text-center mb-6'>
                <span className='inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider'>
                    Secure Reset ⚡
                </span>
                <h2 className='text-3xl font-black text-secondary tracking-tight font-display mb-1.5'>
                    Reset Password
                </h2>
                <p className='text-xs lg:text-sm text-gray-500 font-medium'>
                    Please enter your new strong password below to secure your Ashivo account.
                </p>
            </div>

            <form className='grid gap-4 mt-2' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label htmlFor='newPassword' className='text-xs lg:text-sm font-bold text-secondary text-left'>New Password</label>
                    <div className='bg-[#F5F3FF]/50 p-3 border border-purple-100/80 rounded-xl flex items-center focus-within:bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id='newPassword'
                            className='w-full bg-transparent outline-none text-sm font-semibold text-secondary placeholder-gray-400'
                            name='newPassword'
                            value={data.newPassword}
                            onChange={handleChange}
                            placeholder='Enter new password'
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
                            placeholder='Confirm new password'
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
                    Change Password
                </button>

            </form>

            <p className='text-xs lg:text-sm text-gray-500 font-medium mt-6 text-center border-t border-purple-50/80 pt-6'>
                Already have an account? <Link to={"/login"} className='font-bold text-primary hover:text-primary-hover hover:underline transition-colors'>Login Here</Link>
            </p>
        </div>
    </section>
  )
}

export default ResetPassword