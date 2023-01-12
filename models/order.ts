import type { NextApiRequest, NextApiResponse } from 'next'
import methods from 'micro-method-router'
import { pool as connection } from "../pages/api/lib/db-sql/connection"
type Me = {
    email: string;
    nombre: string;
}
export class Order {
    orderId: number;
    userId: number;
    productID: number;
    status: string;
    constructor(orderId: number) {
        this.orderId = orderId;
    }
    ///getters


    async pull() {
        const res = await connection.query(`SELECT productID,userId,status from orders where orderId = ${this.orderId};`)
        try {
            const data = res[0];
            const { productID, userId, status } = data[0];
            this.productID = productID;
            this.userId = userId;
            this.status = status;
        } catch (err) {
            console.error("no se pudo hacer el pull de la order");
        }
    }
    async push() {
        const res = await connection.query(`UPDATE orders 
    set
    userId = ${this.userId}, 
    productID = '${this.productID}',
    status = '${this.status}'
    where orderId = ${this.orderId};`)
        try {
            return this;
        } catch (err) {
            console.error("error");
            return null
        }
    }
    static async createOrder(userId: number, productID: number) {
        const res = await connection.query(`INSERT into orders (productID,userId) VALUES ('${productID}','${userId}');`)
        try {
            const data: any = res[0];
            const newOrder = new Order(data.insertId);
            newOrder.productID = productID;
            newOrder.userId = userId;
            return newOrder;
        } catch (err) {
            console.log(err, "error");
            return null
        }
    }



};