import { User } from "../models/user";
import { comrpuebaToken } from "../pages/api/lib/compruebaToken";
export async function meData(req) {
    const data = comrpuebaToken(req);
    if (data.error) {
        return data;;
    }
    const user = new User(data.userId);
    await user.pull();
    return user;
}
export async function actualizaMeData(req,data) {
    const token = comrpuebaToken(req);
    if (token.error) {
        return token;
    }
    const user = new User(token.userId);
    await user.pull();
    user.nombre = data.nombre;
    await user.push()    
    return user;

}