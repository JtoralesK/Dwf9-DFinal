import type { NextApiRequest, NextApiResponse } from 'next'
import methods from 'micro-method-router'
import { getMerchantOrder } from '../lib/mercadoPagoFunctions'
import { Order } from '../../../models/order';
export default methods({
    async post(req: NextApiRequest, res: NextApiResponse) {
        const { id, topic } = req.query;
        if (id && topic) {
            const idNumber: number = JSON.parse(id as string);
            if (topic == "merchant_order") {
                const order = await getMerchantOrder(idNumber);
                const orderResponse = order.response;
                if (orderResponse.order_status === 'paid') {
                    const orderId = JSON.parse(orderResponse.external_reference);
                    const newOrder = new Order(orderId);
                    await newOrder.pull();
                    newOrder.status = "closed";
                    await newOrder.push();
                    console.log(newOrder);

                }
            }
        }

        res.send(true)
    }

})

