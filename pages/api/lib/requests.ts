export  function calcula(a,b, tam:number){
  
    let limit:number= parseInt(a as string);
    let offset:number= parseInt(b as string);

    if(limit){
     limit = limit <20 && limit > 0 ? limit : 10;
    }else{
     limit = 10;
    }
  if(offset){
    offset = offset < tam && offset > 0 ? offset : 0;
   }else{
    offset = 0;
   }
    return {limit,offset,tam}
  }