import { Auth } from "../models/auth"
import { User } from "../models/user";
import gen from "random-seed"
import addMinutes from "date-fns/addMinutes"
var seed = 'Myhjkl';
const rand4 = gen();

export async function findOrCreateAuth(data: any) {
    const { email } = data;
    const cleanEmail = email.trim().toLowerCase();
    const auth = await Auth.findEmail(cleanEmail);
    if (auth != null) {
        return auth;
    } else {
        const newUser = await User.createUser(email);
        const newAuth = await Auth.createAuth({
            userId: newUser.id,
            codigo: 0,
            email,
            fechaLimite: "",
        });
        return newAuth;
    }
}
export async function sendCode(data) {
    const auth = await findOrCreateAuth(data);
    const codigo = rand4.intBetween(10000, 99999)
    const date = new Date();
    const newDate = addMinutes(date, 15);
    auth.codigo = codigo;
    auth.fechaLimite = newDate
    //auth.show();
    auth.push()
    return { codigo: auth.codigo, email: auth.email };
}