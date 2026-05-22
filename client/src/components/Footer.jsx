import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaLock } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-secondary text-gray-400 border-t border-gray-800 pt-16 pb-8 font-sans'>
        <div className='container mx-auto px-4 lg:px-6'>
            {/* Top Grid Area */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12'>
                
                {/* Brand Column */}
                <div className='space-y-4 text-left'>
                    <div className='flex items-center gap-2'>
                        <span className='text-2xl font-black text-white tracking-wider font-display'>
                            ASHIVO<span className='text-primary'>.</span>
                        </span>
                        <span className='bg-primary/20 text-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider'>
                            10 Min ⚡
                        </span>
                    </div>
                    <p className='text-xs lg:text-sm text-gray-400 leading-relaxed font-medium'>
                        Experience the future of quick-commerce. Ashivo delivers fresh groceries, daily essentials, and gourmet favorites right to your doorstep in 10 minutes.
                    </p>
                    <div className='flex items-center gap-3.5 pt-2'>
                        <a href='https://facebook.com' target="_blank" rel="noopener noreferrer" className='w-9 h-9 rounded-full bg-gray-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1' aria-label="Facebook">
                            <FaFacebook className="text-base" />
                        </a>
                        <a href='https://instagram.com' target="_blank" rel="noopener noreferrer" className='w-9 h-9 rounded-full bg-gray-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1' aria-label="Instagram">
                            <FaInstagram className="text-base" />
                        </a>
                        <a href='https://linkedin.com' target="_blank" rel="noopener noreferrer" className='w-9 h-9 rounded-full bg-gray-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1' aria-label="LinkedIn">
                            <FaLinkedin className="text-base" />
                        </a>
                        <a href='https://twitter.com' target="_blank" rel="noopener noreferrer" className='w-9 h-9 rounded-full bg-gray-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1' aria-label="Twitter">
                            <FaTwitter className="text-base" />
                        </a>
                    </div>
                </div>

                {/* Useful Links Column */}
                <div className='text-left'>
                    <h4 className='text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-primary pl-2.5'>
                        Quick Links
                    </h4>
                    <ul className='space-y-2.5 text-xs lg:text-sm font-semibold'>
                        <li>
                            <Link to='/' className='hover:text-white transition-colors duration-200'>Home Page</Link>
                        </li>
                        <li>
                            <Link to='/search' className='hover:text-white transition-colors duration-200'>Search Products</Link>
                        </li>
                        <li>
                            <Link to='/login' className='hover:text-white transition-colors duration-200'>Login / Sign In</Link>
                        </li>
                        <li>
                            <Link to='/register' className='hover:text-white transition-colors duration-200'>Register Account</Link>
                        </li>
                    </ul>
                </div>

                {/* Hot Categories Column */}
                <div className='text-left'>
                    <h4 className='text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-primary pl-2.5'>
                        Popular Categories
                    </h4>
                    <ul className='space-y-2.5 text-xs lg:text-sm font-semibold'>
                        <li>
                            <span className='hover:text-white cursor-pointer transition-colors duration-200'>Fruits & Vegetables</span>
                        </li>
                        <li>
                            <span className='hover:text-white cursor-pointer transition-colors duration-200'>Dairy, Bread & Eggs</span>
                        </li>
                        <li>
                            <span className='hover:text-white cursor-pointer transition-colors duration-200'>Snacks & Beverages</span>
                        </li>
                        <li>
                            <span className='hover:text-white cursor-pointer transition-colors duration-200'>Personal & Baby Care</span>
                        </li>
                    </ul>
                </div>

                {/* Contact & Trust Column */}
                <div className='space-y-4 text-left'>
                    <h4 className='text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-primary pl-2.5'>
                        Contact & Support
                    </h4>
                    <div className='space-y-2 text-xs lg:text-sm font-medium'>
                        <p className='text-gray-400'>Have questions or need help?</p>
                        <p className='text-white font-bold hover:text-primary transition-colors'>support@ashivo.com</p>
                        <p className='text-gray-400'>Available 24/7 for you.</p>
                    </div>

                    <div className='pt-2'>
                        <div className='inline-flex items-center gap-2 bg-gray-800/80 px-3.5 py-2 rounded-xl text-xs text-white font-bold border border-gray-700/60'>
                            <FaLock className='text-primary' />
                            <span>100% Secure Checkout</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Row Area */}
            <div className='border-t border-gray-800/80 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs lg:text-sm font-medium'>
                <p className='text-gray-500'>
                    &copy; {currentYear} Ashivo Technologies Private Limited. All rights reserved.
                </p>
                <p className='text-gray-600 flex items-center gap-1.5'>
                    Made with <span className='text-primary animate-pulse'>❤️</span> in India
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer