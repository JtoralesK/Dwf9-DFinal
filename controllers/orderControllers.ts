import { comrpuebaToken } from "../pages/api/lib/compruebaToken";
import { User } from "../models/user";
import { Product } from "../models/products";
import { Order } from "../models/order";
import { createPreference } from "../pages/api/lib/mercadoPagoFunctions";
import { getMerchantOrder } from "../pages/api/lib/mercadoPagoFunctions";

const preference = (product, order) => {
  const data = product.data;
  return {
    items: [
      {
        title: `${data.name}`,
        description: `es un producto de prueba`,
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: `${data.type}`,
        quantity: 1,
        currency_id: "ARS",
        unit_price: data.price,
      },
    ],
    back_urls: {
      sucess: "https://mypageEcommerce",
    },
    external_reference: `${order.orderId}`,
    notification_url: "https://dwf9-d-final.vercel.app/api/ipn/mercadopago",
  };
};

export async function intencionDeCompra(req) {
  const result = comrpuebaToken(req);
  if (result.error) return result;
  const user = new User(result.userId);
  const producId = req.query.productId as string;
  const product = await Product.findProduct(producId);
  if (product != null) {
    const order = await Order.createOrder(user.id, product.productId);
    const prefences = await createPreference(preference(product, order));
    return { link: prefences.init_point, orderId: order.orderId };
  } else {
    return { error: "no hay producto con ese id" };
  }
}

export async function getOrder(id: number) {
  const order = new Order(id);
  const res = await order.pull();
  if (!res) return { error: "no se pudo hacer el pull de la order" };
  return order;
}
export async function getAllOrdersOneUser(req) {
  const result = comrpuebaToken(req);
  if (result.error) return result;
  const order = await Order.getAllOrdersOneUser(result.userId);
  return order;
}
export async function respMP(idNumber) {
  const order = await getMerchantOrder(idNumber);
  const orderResponse = order.response;
  if (orderResponse.order_status === "paid") {
    const orderId = JSON.parse(orderResponse.external_reference);
    const newOrder = new Order(orderId);
    await newOrder.pull();
    newOrder.status = "closed";
    await newOrder.push();
    console.log(newOrder);
  }
}
