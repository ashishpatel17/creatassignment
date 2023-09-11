import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import intLib from '../utils/intLib';
import { setCart, getCart } from '../store/reducer';

const ProductCard = ({ productDetails , onCompare }) => {
    let cartValue = useSelector(getCart);
    const cartLib = new intLib();
    const dispatch = useDispatch();

    const addToCart = () => {
        cartLib.addTocart(productDetails);
    }

    const compare = () => {
        onCompare(productDetails);
    }

    return (
        <div className="flex flex-col  w-60 h-66 p-5 m-1.5 mb-2 shadow-md">
            <img className="h-56 w-60" src={productDetails.imageUrl} alt="Image Description" />
            <div className="p-2">
                <div class="flex flex-nowrap justify-between">
                    <h3 className="text-lg font-bold text-gray-800 ">
                        {productDetails.brand}
                    </h3>
                    <p className="mt-1 text-gray-800 dark:text-gray-400">
                        {productDetails.name}
                    </p>
                </div>
                <div class="flex flex-nowrap justify-between">
                    <p className="mt-1 text-gray-800 dark:text-gray-400">
                        {productDetails.price}
                    </p>
                    <img onClick={addToCart} className="w-5 h-5 mt-2 cursor-pointer" src="/add-to-cart.png" />
                </div>
                <button onClick={compare} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                        Compare
                </button>
            </div>
        </div>
    );
}

export default ProductCard;