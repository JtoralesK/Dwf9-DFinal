import jwt from "jsonwebtoken"
export function generate(obj):string|boolean{
    try {
        return jwt.sign(obj, process.env.JWT_KEY);
    } catch (err) {
        console.log("no se pudo generar token");
        return false;
    }
}
export function decode(token){
    try {
        return jwt.verify(token, process.env.JWT_KEY)
    } catch (err) {
        console.log("token incorrecto");
        return false;
    }

}
