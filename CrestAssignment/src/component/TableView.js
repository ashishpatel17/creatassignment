import React, { useState, useEffect } from 'react';
import intLib from '../utils/intLib';

const TableView = ({ allProducts }) => {
    const [productList, setproductList] = useState([]);
    const cartLib = new intLib();

    const addTocart = (item) => {
        cartLib.addTocart(item);
    }

    useEffect(() => {
        setproductList(allProducts);
    }, []);



    return (
        <table class="min-w-full leading-normal">
            <thead>
                <tr>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                        Image
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                        Product
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                        Brand
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                        Price
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                    > Add to card</th>
                </tr>
            </thead>
            <tbody>
                {productList.map((item, index) => (
                    <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div class="flex">
                                <div class="flex-shrink-0 w-10 h-10">
                                    <img
                                        class="w-full h-full rounded-full"
                                        src={item.imageUrl}
                                        alt=""
                                    />
                                </div>
                                <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {item.name}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                                {item.name}
                            </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                                {item.brand}
                            </p>

                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">{item.price}</p>
                            <p class="text-gray-600 whitespace-no-wrap">-/Rs</p>
                        </td>
                        <td
                            class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                        >
                            <button onClick={() => addTocart(item)} class="cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
                                Add to cart
                            </button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    );
}

export default TableView;