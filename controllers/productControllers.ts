import { Product } from "../models/products";
export async function getProduct(id: string) {
  const product = new Product(id);
  const res = await product.pull();
  if (!res) return { error: "no se pudo traer la data de product" };
  return product;
}
export async function getProductByQuery(
  q: string,
  offset: number,
  limit: number
) {
  const results = await Product.searchQ(q, offset, limit);
  if (!results) return { error: "algo fallo en la busqueda" };
  return results;
}
