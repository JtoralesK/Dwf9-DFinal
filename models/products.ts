import { index } from "../pages/api/lib/algolia"
export class Product {
    productId: string;
    data: {}
    constructor(productId) {
        this.productId = productId;
    }
    async pull() {
        try {
            const object = await index.getObject(this.productId);
            this.data = object;
            return true;
        } catch (err) {
            console.error("no se pudo traer la data de product");
            return false;
        }
    }

    static async findProduct(productId: string) {
        try {
            const object = await index.getObject(productId);
            const product = new Product(productId)
            product.data = object;
            return product;
        } catch (err) {
            console.error("no se pudo traer la data de product");
            return null;
        }
    }
    static async searchQ(q: string, offset: number, limit: number) {
        try {
            const results = await index.search(q, {
                hitsPerPage: limit,
                page: offset > 1 ? Math.floor(offset / limit) : 0
            })
            return results.hits;
        } catch (err) {
            console.log("hubo un error:", err);
            return false;
        }

    }

};