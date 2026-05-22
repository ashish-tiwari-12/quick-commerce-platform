import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.webp'
import toast from 'react-hot-toast'

const DisplayCartItem = ({close}) => {
    const { notDiscountTotalPrice, totalPrice ,totalQty} = useGlobalContext()
    const cartItem  = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage = ()=>{
        if(user?._id){
            navigate("/checkout")
            if(close){
                close()
            }
            return
        }
        toast.error("Please login to proceed to checkout")
    }

    return (
        <section className='bg-[#111827]/40 backdrop-blur-sm fixed top-0 bottom-0 right-0 left-0 z-50 flex justify-end transition-opacity duration-300' onClick={close}>
            <div className='bg-white w-full max-w-md min-h-screen max-h-screen flex flex-col shadow-2xl border-l border-purple-100/50' onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className='flex items-center p-5 shadow-sm border-b border-purple-50/50 gap-3 justify-between bg-white'>
                    <h2 className='text-lg font-black text-secondary tracking-tight font-display flex items-center gap-1.5'>
                        My Cart <span className='bg-primary/10 text-primary text-xs font-black px-2 py-0.5 rounded-full'>{totalQty} {totalQty === 1 ? 'item' : 'items'}</span>
                    </h2>
                    <div className='flex items-center gap-2'>
                        <Link to={"/"} onClick={close} className='lg:hidden p-1.5 hover:bg-[#F5F3FF] rounded-lg transition-colors text-gray-500 hover:text-primary'>
                            <IoClose size={22}/>
                        </Link>
                        <button onClick={close} className='hidden lg:block p-1.5 hover:bg-[#F5F3FF] rounded-lg transition-colors text-gray-500 hover:text-primary'>
                            <IoClose size={22}/>
                        </button>
                    </div>
                </div>

                {/* Body Content */}
                <div className='flex-1 overflow-y-auto bg-[#F5F3FF]/45 p-4 flex flex-col gap-4 scrollbar-thin'>
                    {
                        cartItem[0] ? (
                            <>
                                {/* Savings Pill */}
                                <div className='flex items-center justify-between px-4 py-2.5 bg-success/10 border border-success/15 text-success rounded-xl text-xs font-black shadow-sm'>
                                    <p className='tracking-wide uppercase'>Your total savings</p>
                                    <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice )}</p>
                                </div>

                                {/* Items List Container */}
                                <div className='bg-white rounded-2xl p-4 border border-purple-100/30 flex flex-col gap-4 shadow-sm'>
                                    {
                                        cartItem.map((item,index)=>{
                                            return(
                                                <div key={item?._id+"cartItemDisplay"} className='flex w-full gap-3.5 items-center py-2.5 border-b border-purple-50/40 last:border-b-0'>
                                                    {/* Thumbnail Frame */}
                                                    <div className='w-16 h-16 min-h-16 min-w-16 bg-[#F5F3FF]/40 border border-purple-100/40 rounded-xl overflow-hidden flex items-center justify-center p-1.5'>
                                                        <img
                                                            src={item?.productId?.image[0]}
                                                            alt={item?.productId?.name}
                                                            className='object-contain w-full h-full'
                                                        />
                                                    </div>

                                                    {/* Details */}
                                                    <div className='flex-1 min-w-0 text-left'>
                                                        <p className='text-xs lg:text-sm font-bold text-secondary truncate-2-lines leading-snug mb-0.5'>{item?.productId?.name}</p>
                                                        <p className='text-[10px] lg:text-xs text-gray-400 font-semibold mb-1'>{item?.productId?.unit}</p>
                                                        <p className='font-extrabold text-xs lg:text-sm text-secondary'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price,item?.productId?.discount))}</p>
                                                    </div>

                                                    {/* Add to Cart Actions */}
                                                    <div className='flex-shrink-0'>
                                                        <AddToCartButton data={item?.productId}/>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                {/* Bill Details */}
                                <div className='bg-white rounded-2xl p-4 border border-purple-100/30 shadow-sm text-left flex flex-col gap-3'>
                                    <h3 className='font-black text-secondary text-sm tracking-wide uppercase mb-1 border-b border-purple-50/50 pb-2'>Bill details</h3>
                                    
                                    <div className='flex justify-between items-center text-xs lg:text-sm font-semibold text-gray-500'>
                                        <p>Items total</p>
                                        <p className='flex items-center gap-2'>
                                            <span className='line-through text-gray-300 font-medium'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                                            <span className='text-secondary font-bold'>{DisplayPriceInRupees(totalPrice)}</span>
                                        </p>
                                    </div>

                                    <div className='flex justify-between items-center text-xs lg:text-sm font-semibold text-gray-500'>
                                        <p>Quantity total</p>
                                        <p className='text-secondary font-bold'>{totalQty} {totalQty === 1 ? 'item' : 'items'}</p>
                                    </div>

                                    <div className='flex justify-between items-center text-xs lg:text-sm font-semibold text-gray-500'>
                                        <p>Delivery Charge</p>
                                        <p className='text-success font-bold flex items-center gap-1'>
                                            <span className='line-through text-gray-300 font-medium'>{DisplayPriceInRupees(25)}</span>
                                            <span>FREE</span>
                                        </p>
                                    </div>

                                    <div className='border-t border-purple-50/80 pt-3 mt-1 font-black text-sm lg:text-base text-secondary flex items-center justify-between'>
                                        <p>Grand total</p>
                                        <p className='text-primary text-base lg:text-lg'>{DisplayPriceInRupees(totalPrice)}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='bg-white rounded-2xl p-8 border border-purple-100/30 flex flex-col justify-center items-center gap-4 text-center mt-8 shadow-sm'>
                                <div className='w-48 h-48'>
                                    <img
                                        src={imageEmpty}
                                        alt="Empty cart logo"
                                        className='w-full h-full object-contain opacity-80' 
                                    />
                                </div>
                                <div className='space-y-1.5'>
                                    <h3 className='font-black text-secondary text-base lg:text-lg'>Your cart is empty</h3>
                                    <p className='text-xs text-gray-400 font-semibold max-w-[240px]'>Add items to your cart to experience lightning-fast delivery!</p>
                                </div>
                                <button 
                                    onClick={close}
                                    className='inline-flex items-center justify-center bg-primary hover:bg-primary-hover active:scale-95 transition-all text-white font-extrabold text-xs lg:text-sm px-6 py-2.5 rounded-xl shadow-[0_4px_12px_rgba(108,99,255,0.2)]'
                                >
                                    Shop Now
                                </button>
                            </div>
                        )
                    }
                </div>

                {/* Footer Proceed Panel */}
                {
                    cartItem[0] && (
                        <div className='p-4 bg-white border-t border-purple-50/80'>
                            <button 
                                onClick={redirectToCheckoutPage} 
                                className='w-full bg-primary hover:bg-primary-hover active:scale-[0.99] text-white px-5 font-black text-sm lg:text-base py-4 rounded-2xl flex items-center gap-4 justify-between shadow-[0_4px_16px_rgba(108,99,255,0.25)] transition-all duration-300'
                            >
                                <div className='flex flex-col text-left leading-none gap-1'>
                                    <span className='text-[10px] text-purple-100 uppercase tracking-widest font-extrabold'>Grand Total</span>
                                    <span className='text-base font-black'>{DisplayPriceInRupees(totalPrice)}</span>
                                </div>
                                <div className='flex items-center gap-1 font-black text-sm lg:text-base'>
                                    Proceed to Checkout
                                    <FaCaretRight className='text-lg' />
                                </div>
                            </button>
                        </div>
                    )
                }
                
            </div>
        </section>
    )
}

export default DisplayCartItem