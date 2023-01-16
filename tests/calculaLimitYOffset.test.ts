import { calcula } from "../externalFunctions/calculaLimitYOffset";
import test from 'ava';
test('calculaLimitYOffset', t => {
    const {limit,offset,tam} = calcula("15","100",50);
    console.log(limit,offset,tam);
    t.is(15,limit);
    t.is(0,offset);

});