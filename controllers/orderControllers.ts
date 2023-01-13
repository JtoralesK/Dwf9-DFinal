import { comrpuebaToken } from "../pages/api/lib/compruebaToken"
import { User } from "../models/user"
import { Product } from '../models/products'
import { Order } from '../models/order'
import { createPreference } from '../pages/api/lib/mercadoPagoFunctions'

const preference = (product, order) => {
    return {
        "items": [
            {
                "title": `${product.name}`,
                "description": "iphone x",
                "picture_url": "http://www.myapp.com/myimage.jpg",
                "category_id": "car_electronics",
                "quantity": 1,
                "currency_id": "ARS",
                "unit_price": product.price
            }
        ],
        "back_urls": {
            "sucess": "https://mypageEcommerce"
        },
        "external_reference": `${order.orderId}`,
        "notification_url": "https://dw9-m5.vercel.app/api/webHooks/mercadopago"
    }
}


export async function intencionDeCompra(req) {
    const result = comrpuebaToken(req);
    const user = new User(result.userId);
    const producId = JSON.parse(req.query.productId as string);
    const product = await Product.findProduct(producId);
    if (product != null) {
        const order = await Order.createOrder(user.id, product.productId);
        const prefences = await createPreference(preference(product, order));
        return  prefences.init_point;
    } else {
        return { error: "no hay producto con ese id" };
    }

}

export async function getOrder(id:number){
    const order= new Order(id);
    const res =await order.pull();
    if(!res)return {error:"no se pudo hacer el pull de la order"};
    return order;
}