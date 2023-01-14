import { User } from "../models/user";
import { comrpuebaToken } from "../pages/api/lib/compruebaToken";
export async function meData(req) {
    const data = comrpuebaToken(req);
    if (data.error) {
        return data;;
    }
    const user = new User(data.userId);
    await user.pull();
    console.log(user);
    
    return user;
}
export async function actualizaMeData(req,data) {
    const res = comrpuebaToken(req);
    if (res.error)  return res;
    
    const user = new User(res.userId);
    await user.pull();
    user.nombre = data.nombre;
    await user.push()    
    return user;

}