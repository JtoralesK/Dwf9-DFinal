import type { NextApiRequest, NextApiResponse } from 'next'
import methods from 'micro-method-router'
import { comrpuebaToken } from "./lib/compruebaToken/index"
import { User } from "../../models/user"
import { Product } from '../../models/products'
import { Order } from '../../models/order'
import { createPreference } from './lib/mercadoPagoFunctions'
export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const result = comrpuebaToken(req, res);
    const user = new User(result.userId);
    const producId = JSON.parse(req.query.productId as string);
    const product = await Product.findProduct(producId);
    if (product != null) {
      const order = await Order.createOrder(user.id, product.productId);
      const prefences = await createPreference({
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
      });
      res.send({ linkDePago: prefences.init_point });
    } else {
      res.send({ erorr: "no hay producto con ese id" })
    }

  }

})