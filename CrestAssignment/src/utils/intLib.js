import { useDispatch, useSelector } from 'react-redux';
import productService from '../service/products';
import { setCart, getCart } from '../store/reducer';

class intLib {

    src = new productService();
    cartValue = useSelector(getCart);
    dispatch = useDispatch();

    async addTocart(item) {
        let inventory = await this.src.getProductsInventory(item.productId);
        let existingCart = JSON.parse(JSON.stringify(this.cartValue));
        let selectedProd = {
            brand: item.brand,
            id: item.id,
            name: item.name,
            price: item.price,
            productId: item.productId,
            purchaseLimit: item.purchaseLimit,
            count: 1
        };
        item = [selectedProd];
        if (existingCart && existingCart.length > 0) {
            let isUpdate = false;
            let isLimit = true;
            let msg = "";
            const updateCart = existingCart.map(obj => {
                if (obj.productId == selectedProd.productId) {
                    if (obj.count >= selectedProd.purchaseLimit || obj.count >= inventory.quantity) {
                        isLimit = false;
                        msg = "this product has purchase limit upto " + selectedProd.purchaseLimit;
                        if (obj.count >= inventory.quantity) {
                            msg = "reached to stock limit can't add this product to cart";
                        }
                    } else {
                        obj.count = obj.count + 1;
                        isUpdate = true;
                    }
                }
                return obj;
            });
            if (isLimit) {
                item = isUpdate ? updateCart : [...existingCart, selectedProd];
            } else {
                alert(msg);
                return false;
            }
        }
        this.dispatch(setCart({ cart: item }));
    }
}


export default intLib;