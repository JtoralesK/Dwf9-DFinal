import jwt from "jsonwebtoken"
export async function generate (obj){
const token = jwt.sign(obj, process.env.JWT_KEY);
try{
    return token;
}catch(err){
    console.log("no se pudo generar token");
    return null
}
}
export function decode (token,res){    
    const data= jwt.verify(token, process.env.JWT_KEY,function(err, decoded) {                        
   return {decoded,err}
 })
 return data;
 }
