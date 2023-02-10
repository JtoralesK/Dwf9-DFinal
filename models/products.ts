import { calcula } from "externalFunctions/calculaLimitYOffset";
import { index } from "lib/algolia";
import { base } from "lib/airtable";
import algoliasearch from "algoliasearch";

const newObjectIndex = (e) => {
  const newObj = { ...e.fields };
  newObj.objectID = e.id;
  return newObj;
};

export class Product {
  productId: string;
  data: {};
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
      const product = new Product(productId);
      product.data = object;
      return product;
    } catch (err) {
      console.error("no se pudo traer la data de product");
      return null;
    }
  }
  static async searchQ(q: string, b: number, a: number) {
    try {
      const total = 31;
      const { limit, offset } = calcula(a, b, total);
      const ult = limit + offset > total ? total : limit + offset;
      const results = await index.search(q, {
        hitsPerPage: limit,
        page: offset > 1 ? Math.floor(offset / limit) : 0,
      });
      return {
        pagination: {
          limit,
          offset,
          ultimo: ult,
        },
        results: results.hits,
      };
    } catch (err) {
      console.log("hubo un error:", err);
      return false;
    }
  }
  static async getProductsOfAirtable(limit, offset) {
    let vIndex = [];
    await base("Furniture")
      .select({
        pageSize: limit,
      })
      .eachPage(function page(records, fetchNextPage) {
        try {
          records.forEach(function (record) {
            const obj = newObjectIndex(record);
            vIndex.push(obj);
          });
        } catch (e) {
          console.log("error inside eachPage => ", e);
        }
        console.log("se paso a otra pagina");
        fetchNextPage();
      });
    const res = await Product.syncProductsAlgolia(vIndex);
    if (res) return { limit, offset: limit + offset };
  }
  static async syncProductsAlgolia(vIndex: any[]) {
    try {
      index.saveObjects(vIndex).wait();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
