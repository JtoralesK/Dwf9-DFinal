import type { NextApiRequest, NextApiResponse } from 'next'
import { pool as connection } from "../pages/api/lib/db-sql/connection"
import {index} from "../pages/api/lib/algolia"
import {calcula} from"../pages/api/lib/requests"
export class Product {
    productId: number;
    name: string;
    price: number;
    constructor(productId) {
        this.productId = productId;
    }
    ///getters


    async pull() {
        //const {limit,offset}= calcula(req.query.limit,req.query.offset,100);
        /*index.getObject('myId').then(object => {
            console.log(object);
          });
          console.log(results);
          */
        const res = await connection.query(`SELECT name,price from products where productId = ${this.productId};`)
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
        const res = await connection.query(`INSERT into products(name,price) VALUES ("${name}",${price});`)
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
        const res = await connection.query(`SELECT productId,name,price from products where productId = '${productId}';`)
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