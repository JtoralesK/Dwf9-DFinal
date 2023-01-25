import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { calcula } from "../../../externalFunctions/calculaLimitYOffset";
import { base } from "../lib/airtable";
import { index } from "../lib/algolia";

const newObjectIndex = (e) => {
  const newObj = { ...e.fields, objectID: e.id };
  return newObj;
};

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { limit, offset } = calcula(req.query.limit, req.query.offset, 100);
    base("Furniture")
      .select({
        pageSize: limit,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          let vIndex = [];
          try {
            records.forEach(function (record) {
              const obj = newObjectIndex(record);
              vIndex.push(obj);
            });
          } catch (e) {
            console.log("error inside eachPage => ", e);
          }
          index.saveObjects(vIndex).wait();
          index.search("dwf9").then(({ hits }) => console.log());
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );

    res.json("se enviaron todos los request");
  },
});
