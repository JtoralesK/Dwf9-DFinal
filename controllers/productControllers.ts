import { Product } from "../models/products";
export async function getProduct(id:Number){
    const product = new Product(id);
    await product.pull();
    return product;
}