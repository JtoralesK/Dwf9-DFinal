import { User } from "models/user";
import { comrpuebaToken } from "lib/compruebaToken";
export async function meData(req) {
  const data = comrpuebaToken(req);
  if (data.error) {
    return data;
  }
  const user = new User(data.userId);
  await user.pull();
  console.log(user);

  return user;
}
export async function actualizaMeData(req, data) {
  const res = comrpuebaToken(req);
  if (res.error) return res;
  const user = new User(res.userId);
  await user.pull();
  if (data.nombre) user.nombre = data.nombre;
  if (data.address) user.address = data.address;
  await user.push();
  return user;
}
