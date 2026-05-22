import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails,setCartItemsDetails] = useState()

    const handleADDTocart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!user?._id) {
            toast.error("Please login to add items to your cart")
            navigate("/login")
            return
        }

        try {
            setLoading(true)

            const response = await Axios({
                ...SummaryApi.addTocart,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }

    }

    //checking this item in cart or not
    useEffect(() => {
        const checkingitem = cartItem.some(item => item.productId._id === data._id)
        setIsAvailableCart(checkingitem)

        const product = cartItem.find(item => item.productId._id === data._id)
        setQty(product?.quantity)
        setCartItemsDetails(product)
    }, [data, cartItem])


    const increaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()
    
       const response = await  updateCartItem(cartItemDetails?._id,qty+1)
        
       if(response.success){
        toast.success("Item added")
       }
    }

    const decreaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        if(qty === 1){
            deleteCartItem(cartItemDetails?._id)
        }else{
            const response = await updateCartItem(cartItemDetails?._id,qty-1)

            if(response.success){
                toast.success("Item remove")
            }
        }
    }
    return (
        <div className='w-full max-w-[120px]'>
            {
                isAvailableCart ? (
                    <div className='flex items-center bg-primary text-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-primary/20 h-8 lg:h-9'>
                        <button 
                            onClick={decreaseQty} 
                            className='h-full px-2.5 hover:bg-primary-hover active:scale-90 transition-all duration-200 flex items-center justify-center'
                            title="Decrease quantity"
                        >
                            <FaMinus className="text-[10px]" />
                        </button>

                        <p className='flex-1 text-center font-black text-xs lg:text-sm min-w-[20px] select-none px-1'>{qty}</p>

                        <button 
                            onClick={increaseQty} 
                            className='h-full px-2.5 hover:bg-primary-hover active:scale-90 transition-all duration-200 flex items-center justify-center'
                            title="Increase quantity"
                        >
                            <FaPlus className="text-[10px]" />
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={handleADDTocart} 
                        className='w-full h-8 lg:h-9 bg-primary hover:bg-primary-hover active:scale-[0.98] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(108,99,255,0.25)] text-white text-xs lg:text-sm font-extrabold px-3 lg:px-4 rounded-lg border border-primary/10 tracking-wider flex items-center justify-center'
                    >
                        {loading ? <Loading /> : "ADD"}
                    </button>
                )
            }

        </div>
    )
}

export default AddToCartButton