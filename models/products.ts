import type { NextApiRequest, NextApiResponse } from 'next'
import { pool as connection } from "../pages/api/lib/db-sql/connection"

export class Product {
    productId: number;
    name: string;
    price: number;
    constructor(productId) {
        this.productId = productId;
    }
    ///getters


    async pull() {
        const res = await connection.query(`SELECT name,price from product where productId = ${this.productId};`)
        try {
            const data = res[0];
            const { name, price } = data[0];
            this.name = name;
            this.price = price;
            return true;
        } catch (err) {
            console.error("no se pudo traer la data de product");
            return false;
        }
    }

    static async createProduct(name: string, price: number) {
        const res = await connection.query(`INSERT into product(name,price) VALUES ("${name}",${price});`)
        try {
            const data: any = res[0];
            const newUser = new Product(data.insertId);
            await newUser.pull();
            return newUser;
        } catch (err) {
            console.log(err, "no se pudo crear el producto");
            return null
        }
    }

    static async findProduct(productId: number) {
        const res = await connection.query(`SELECT productId,name,price from product where productId = '${productId}';`)
        try {
            const data: any = res[0]
            let count = 0;
            data.map((e) => count++)
            if (count > 0) {
                const { productId, name, price } = data[0];
                const product = new Product(productId)
                product.name = name;
                product.price = price;
                return product;
            } else {
                return null;
            }
        } catch (err) {
            console.error(err, "error a");
            return null;
        }

    }

};