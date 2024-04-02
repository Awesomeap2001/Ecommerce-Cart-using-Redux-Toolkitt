import React, { useEffect, useState } from 'react'
import './cartStyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementQuantity, emptyCart, removeFromCart } from '../redux/features/cartSlice';
import toast from 'react-hot-toast';

const CartDetails = () => {
    const { carts } = useSelector((state) => state.allCart);
    // console.log(carts)

    const [totalprice, setTotalprice] = useState(0);
    const [totalquantity, setTotalquantity] = useState(0)

    // add to cart
    const dispatch = useDispatch()
    const handleIncrement = (e) => {
        dispatch(addToCart(e))
    }

    // remove from cart 
    const handleDelete = e => {
        dispatch(removeFromCart(e))
        toast.success("Items removed from your cart")
    }

    // decrement
    const handleDecrement = (e) => {
        dispatch(decrementQuantity(e))
    }

    // empty Cart
    const emptyCartData = () => {
        dispatch(emptyCart())
        toast.success("Your cart is Empty")
    }

    // Count total Price
    const total = () => {
        let grandTotal = 0;
        carts.map((element, index) => {
            grandTotal += element.price * element.qnty
        })
        setTotalprice(grandTotal)
    }

    // Count total quantity
    const countQuantity = () => {
        let totalQuantity = 0;
        carts.map((element, index) => {
            totalQuantity += element.qnty
        })
        setTotalquantity(totalQuantity)
    }

    useEffect(() => {
        total()
    }, [total])

    useEffect(() => {
        countQuantity()
    }, [countQuantity])

    return (
        <>
            <div className="row justify-content-center m-0">
                <div className="col-md-8 my-5 cardsDetails">
                    <div className="card">
                        <div className="card-header bg-dark p-3">
                            <div className="card-header-flex">
                                <h5 className='text-white m-0'>Cart Calculation  {carts.length > 0 ? `(${carts.length})` : ""}</h5>
                                {
                                    carts.length > 0 ? <button onClick={() => emptyCartData()} className='btn btn-danger mt-0 btn-sm'><i className='fa fa-trash-alt mr-2'></i><span>Empty Cart</span></button>
                                        : ""
                                }
                            </div>
                        </div>
                        <div className="card-body p-0">
                            {
                                carts.length === 0 ?
                                    <table className='table cart-table mb-0'>
                                        <tbody>
                                            <tr>
                                                <td colSpan={6}>
                                                    <div className="cart-empty">
                                                        <i className='fa fa-shopping-cart'></i>
                                                        <p>Your Cart is Empty</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    :
                                    <table className='table cart-table mb-0 table-responsive-sm'>
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th className='text-right'><span id='amount' className='amount'>Total Amount</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                carts.map((data, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td><button className='prdct-delete' onClick={() => handleDelete(data.id)}><i className='fa fa-trash-alt'></i></button></td>
                                                            <td><div className='product-img'><img src={data.imgdata} alt="" /></div></td>
                                                            <td><div className='product-name'><p>{data.dish}</p></div></td>
                                                            <td>Rs. {data.price}</td>
                                                            <td>
                                                                <div className="prdct-qty-container">
                                                                    <button className='prdct-qty-btn' type='button' onClick={data.qnty <= 1 ? () => handleDelete(data.id) : () => handleDecrement(data)}>
                                                                        <i className='fa fa-minus'></i>
                                                                    </button>
                                                                    <input type="text" className='qty-input-box' value={data.qnty} disabled />
                                                                    <button className='prdct-qty-btn' type='button' onClick={() => handleIncrement(data)}>
                                                                        <i className='fa fa-plus'></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className='text-right'>Rs. {data.qnty * data.price}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>&nbsp;</th>
                                                <th colSpan={3}>&nbsp;</th>
                                                <th>Items in Cart <span className='mx-2'>:</span><span className='text-danger'>{totalquantity}</span></th>
                                                <th className='text-right'>Total Price <span className='mx-2'>:</span><span className='text-danger'>Rs. {totalprice}</span></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CartDetails