import { decode, generate } from "lib/compruebaToken/jwt";
import test from "ava";

test("jwt generate/decode", (t) => {
  const obj = { user: "test" };
  const token = generate(obj);
  const decoded = decode(token);
  delete decoded.iat;
  t.deepEqual(obj, decoded);
});
