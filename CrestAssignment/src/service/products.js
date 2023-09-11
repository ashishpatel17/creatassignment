import {getFirestore,collection,getDocs,query,where} from 'firebase/firestore'
import {initializeApp} from 'firebase/app'
import firebaseConfig from '../utils/fireBase';
import { getAnalytics } from "firebase/analytics";
import {setProductList} from  '../store/reducer';
import { useDispatch } from 'react-redux';


class productService {
    db;
    productRef;
    inventoryRef;
    analytics;
    dispatch = useDispatch();
    constructor(){
        this.app = initializeApp(firebaseConfig);
        getAnalytics(this.app);
        this.db = getFirestore();
        this.productRef = collection(this.db,'products');
        this.inventoryRef = collection(this.db,'inventory');
    }

    async getProducts(){
        let products = await getDocs(this.productRef);
        let allProduct = [];
        products.forEach((doc)=>{
            allProduct.push({ ...doc.data() , id : doc.id});
        })
        this.dispatch(setProductList({productList:allProduct}));
    }


    async getProductsInventory(productId){
        const intQuery = query(this.inventoryRef, where("productId", "==",productId));
        let intData = await getDocs(intQuery);
        let prodInt ;
        intData.forEach((doc)=>{
            prodInt = { ...doc.data() , id : doc.id};
        })
        return prodInt;

    }

}

export default productService;