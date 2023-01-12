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