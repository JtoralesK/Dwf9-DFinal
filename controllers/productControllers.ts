import { Product } from "../models/products";
export async function getProduct(id:Number){
    const product = new Product(id);
    const res= await product.pull();
    if(!res)return {error:"no se pudo traer la data de product"}    
    return product;
}