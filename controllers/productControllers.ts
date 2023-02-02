import { Product } from "models/products";
import { calcula } from "externalFunctions/calculaLimitYOffset";
import type { NextApiRequest } from "next";

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

export async function syncProducts(req: NextApiRequest) {
  const { limit, offset } = calcula(req.query.limit, req.query.offset, 100);
  const data = await Product.getProductsOfAirtable(limit, offset);
  return data;
}
