import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../component/ProductCard';
import Cart from '../component/Cart';
import TableView from '../component/TableView';
import { getProductList, getViewType, setViewType } from '../store/reducer';
import productService from '../service/products';
import ProductCompare from '../component/ProductCompare';

const Home = () => {
    let products = [];
    products = useSelector(getProductList);
    const dispatch = useDispatch();

    const [view, setView] = useState(useSelector(getViewType));
    const [compareProduct, setCompareProduct] = useState(undefined);
    const [showCompare, setShowCompare] = useState(false);

    let src = new productService();

    useEffect(() => {
        const fetchData = async () => {
            await src.getProducts();
        }
        fetchData();
    }, [])

    const changeView = () => {
        let selectedView = "grid";
        if (view === 'grid') {
            selectedView = "list";
        }
        setView(selectedView);
        dispatch(setViewType({ viewtype: selectedView }));
    }

    const compareData = (item) => {
        setCompareProduct(item);
    }



    const toggleCompare = () =>{
        showCompare?setShowCompare(false):setShowCompare(true)
    }


    return (
        <div className="grid grid-cols-12 gap-4 flex-nowrap">
            <div className="col-span-2">
                <Cart></Cart>
            </div>
            <div className="col-span-10">
                <div className="flex w-full justify-end">
                    <div className="float-right m-5">
                        <div className="inline-flex shadow-sm rounded-md mb-5" role="group">
                            {(compareProduct != undefined) ? (
                                <button onClick={()=>compareData(undefined)} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                                    clear Compare
                                </button>
                            ) : ""}
                            {(compareProduct != undefined) ? (
                                <button onClick={toggleCompare} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                                    Show Compare
                                </button>
                            ) : ""}
                            <button onClick={changeView} className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4  inline-flex items-center ${view == 'grid' ? 'active-view' : ''}`}>
                                <img className="w-5 h-5" src="/grid.png" />
                            </button>
                            <button onClick={changeView} className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4  inline-flex items-center ${view == 'list' ? 'active-view' : ''}`}>
                                <img className="w-5 h-5" src="/table.jpg" />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <ProductCompare showModel={showCompare} products={compareProduct}></ProductCompare>
                </div>
                {
                    view == 'grid' ? (
                        <div className='flex flex-wrap'>
                            {products.map((item, index) => (
                                <ProductCard onCompare={compareData} productDetails={item}>
                                </ProductCard>
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-wrap'>
                            <TableView allProducts={products}></TableView>
                        </div>
                    )
                }

            </div>
        </div>
    );
}

export default Home