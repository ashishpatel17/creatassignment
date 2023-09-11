import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { setCart, getCart } from '../store/reducer';
import intLib from '../utils/intLib';

const Cart = () => {
    let cartValue = useSelector(getCart);
    const dispatch = useDispatch();
    let cartLib = new intLib();


    const removeFromCart = (item) =>{
        let existingCart = JSON.parse(JSON.stringify(cartValue));
        if (existingCart && existingCart.length > 0) {
            let isZero = false;
            const updateCart = existingCart.map((obj,index) => {
                if (obj.productId == item.productId) {
                    obj.count = obj.count - 1;
                    isZero = (obj.count == 0)?index:false;
                }
                return obj;
            });
            if(isZero!==false){
                updateCart.splice(isZero,1);
            }
            item = updateCart
        }
        dispatch(setCart({ cart: item }));
    }

    const addToCart = (item) =>{
        cartLib.addTocart(item);
    }

    return (
        <div>
            cart
            <div>
            {
                cartValue.map((item,index)=>(
                    <div class="flex flex-nowrap justify-between items-center mb-5">
                    <div>
                        <p>{item.brand}</p>
                        <p>{item.product}</p>
                    </div>
                    <div>
                        <p>{item.price}</p>
                        <p className="mt-1"> 
                            <a onClick={()=>removeFromCart(item)} className='m-1 p-1 border border-gray-500 border-solid cursor-pointer'>-</a> 
                            {item.count} 
                            <a onClick={()=>addToCart(item)} className='m-1 p-1 border border-gray-500 border-solid cursor-pointer'>+</a>
                        </p>
                    </div>
                    <div>{item.count * item.price} </div>
                </div>
                )) 
            }
            </div>
        </div>
    )
}

export default Cart;