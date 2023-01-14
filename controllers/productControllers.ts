import { Product } from "../models/products";
export async function getProduct(id:string){
    const product = new Product(id);
    const res= await product.pull();
    console.log(product.data,"obj");
    if(!res)return {error:"no se pudo traer la data de product"}    
    return product;
}