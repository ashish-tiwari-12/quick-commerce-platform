import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle, FaUser, FaEnvelope, FaPhone, FaCamera, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserData';

const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false)
    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
    })
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
        })
    }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setUserData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data: userData
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='p-4 md:p-6 lg:p-8 max-w-4xl mx-auto'>
            {/* Main Premium Card */}
            <div className='bg-white rounded-3xl shadow-xl shadow-slate-100/80 border border-slate-100/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50'>
                
                {/* Elegant Profile Cover Gradient */}
                <div className='relative h-36 bg-gradient-to-r from-primary to-indigo-600 animate-gradient'>
                    <div className='absolute inset-0 bg-black/10 backdrop-blur-[1px]'></div>
                    
                    {/* User Profile Avatar Wrapper */}
                    <div className='absolute -bottom-12 left-6 md:left-8 flex items-end gap-4'>
                        <div 
                            onClick={() => setProfileAvatarEdit(true)} 
                            className='relative w-24 h-24 bg-slate-100 flex items-center justify-center rounded-2xl overflow-hidden border-4 border-white shadow-lg shadow-slate-200/80 group cursor-pointer'
                        >
                            {
                                user.avatar ? (
                                    <img
                                        alt={user.name}
                                        src={user.avatar}
                                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                    />
                                ) : (
                                    <FaRegUserCircle size={60} className='text-slate-400' />
                                )
                            }
                            {/* Hover Edit Overlay */}
                            <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                <FaCamera className='text-white text-xl' />
                            </div>
                        </div>

                        {/* Basic User Information next to avatar */}
                        <div className='mb-2 pb-1 hidden sm:block'>
                            <div className='flex items-center gap-2'>
                                <h2 className='text-lg font-bold text-slate-800 leading-none'>{user.name || 'Your Name'}</h2>
                                <span className='inline-flex items-center gap-1 text-[10px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-100/60'>
                                    <FaCheckCircle className='text-[8px]' /> Verified
                                </span>
                            </div>
                            <p className='text-xs text-slate-500 font-medium mt-1'>{user.email || 'your-email@domain.com'}</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className='pt-16 pb-8 px-6 md:px-8'>
                    {/* Title */}
                    <div className='mb-8 border-b border-slate-100 pb-4'>
                        <h3 className='text-base font-bold text-slate-800'>Account Settings</h3>
                        <p className='text-xs text-slate-400 font-medium mt-0.5'>Update your personal details and account information below.</p>
                    </div>

                    {/* Account Edit Form */}
                    <form className='grid grid-cols-1 md:grid-cols-2 gap-6' onSubmit={handleSubmit}>
                        
                        {/* Name Field */}
                        <div className='flex flex-col'>
                            <label className='text-xs font-semibold text-slate-500 mb-2 tracking-wider uppercase'>Full Name</label>
                            <div className='relative'>
                                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                                    <FaUser className='text-sm' />
                                </span>
                                <input
                                    type='text'
                                    placeholder='Enter your full name'
                                    className='pl-11 pr-4 py-3 w-full bg-slate-50/50 outline-none border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary-light rounded-xl transition-all text-sm font-medium text-slate-800 placeholder-slate-400'
                                    value={userData.name}
                                    name='name'
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className='flex flex-col'>
                            <label className='text-xs font-semibold text-slate-500 mb-2 tracking-wider uppercase'>Email Address</label>
                            <div className='relative'>
                                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                                    <FaEnvelope className='text-sm' />
                                </span>
                                <input
                                    type='email'
                                    id='email'
                                    placeholder='Enter your email'
                                    className='pl-11 pr-4 py-3 w-full bg-slate-50/50 outline-none border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary-light rounded-xl transition-all text-sm font-medium text-slate-800 placeholder-slate-400'
                                    value={userData.email}
                                    name='email'
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Mobile Field */}
                        <div className='flex flex-col md:col-span-2'>
                            <label className='text-xs font-semibold text-slate-500 mb-2 tracking-wider uppercase'>Mobile Number</label>
                            <div className='relative'>
                                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                                    <FaPhone className='text-sm rotate-90' />
                                </span>
                                <input
                                    type='text'
                                    id='mobile'
                                    placeholder='Enter your mobile number'
                                    className='pl-11 pr-4 py-3 w-full bg-slate-50/50 outline-none border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary-light rounded-xl transition-all text-sm font-medium text-slate-800 placeholder-slate-400'
                                    value={userData.mobile || ''}
                                    name='mobile'
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100'>
                            <button
                                type='submit'
                                disabled={loading}
                                className='w-full md:w-fit px-8 py-3 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-hover hover:to-indigo-700 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none'
                            >
                                {loading ? (
                                    <>
                                        <svg className='animate-spin h-4 w-4 text-white' fill='none' viewBox='0 0 24 24'>
                                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                        </svg>
                                        Updating Profile...
                                    </>
                                ) : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Extra Premium Sub-Card for Security & Status */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
                <div className='bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-300'>
                    <div className='w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600'>
                        <FaCheckCircle className='text-xl' />
                    </div>
                    <div>
                        <h4 className='text-sm font-bold text-slate-800'>Account Status</h4>
                        <p className='text-xs text-slate-500 mt-0.5'>Your email verification and profile are active.</p>
                    </div>
                </div>

                <div className='bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-300'>
                    <div className='w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-primary'>
                        <FaShieldAlt className='text-xl' />
                    </div>
                    <div>
                        <h4 className='text-sm font-bold text-slate-800'>Data Privacy</h4>
                        <p className='text-xs text-slate-500 mt-0.5'>Your connection and personal info are secure.</p>
                    </div>
                </div>
            </div>

            {/* Avatar Edit Modal Modal */}
            {
                openProfileAvatarEdit && (
                    <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
                )
            }
        </div>
    )
}

export default Profile