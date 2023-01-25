import algoliasearch from "algoliasearch";
const client = algoliasearch("FKMA1XLJS1", "de075451ff9b81c93aa1c8e311248b7f");
export const index = client.initIndex("test_index");
