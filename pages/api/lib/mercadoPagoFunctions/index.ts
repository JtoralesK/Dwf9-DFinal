import mercadopago from "mercadopago"
mercadopago.configure({
    access_token: process.env.MP_TOKEN
});
export async function getMerchantOrder(id:number){    
   const res= await mercadopago.merchant_orders.get(id);
   try{
    return res;
   }catch(err){
    return false;
   }
}
export async function createPreference(data={}){    
    const res= await mercadopago.preferences.create(data);
    console.log(res.body);
    return res.body;
 
 }