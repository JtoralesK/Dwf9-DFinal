import { pool as connection } from "lib/db-sql/connection";
export class Order {
  orderId: number;
  userId: number;
  productId: string;
  status: string;
  constructor(orderId: number) {
    this.orderId = orderId;
  }

  async pull() {
    const res = await connection.query(
      `SELECT productId,userId,status from orders where orderId = ${this.orderId};`
    );
    try {
      const data = res[0];
      const { productId, userId, status } = data[0];
      this.productId = productId;
      this.userId = userId;
      this.status = status;
      return true;
    } catch (err) {
      console.error("no se pudo hacer el pull de la order");
      return false;
    }
  }
  async push() {
    const res = await connection.query(`UPDATE orders 
    set
    userId = ${this.userId}, 
    productId = '${this.productId}',
    status = '${this.status}'
    where orderId = ${this.orderId};`);
    try {
      return this;
    } catch (err) {
      console.error("error");
      return null;
    }
  }
  static async createOrder(userId: number, productId: string) {
    const res = await connection.query(
      `INSERT into orders (productId,userId) VALUES ('${productId}','${userId}');`
    );
    try {
      const data: any = res[0];
      const newOrder = new Order(data.insertId);
      newOrder.productId = productId;
      newOrder.userId = userId;
      return newOrder;
    } catch (err) {
      console.log(err, "error");
      return null;
    }
  }

  static async getAllOrdersOneUser(userId: number) {
    const res = await connection.query(
      `SELECT orderId , productId , userId , status from orders where userId = ${userId};`
    );
    return res[0];
  }
}
