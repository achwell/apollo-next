import multiply, { multiplyByTwo as mBy2 } from './multiply'
import './Implementing-Interfaces';

const a = 3
const b = 19.78

console.log(`${a} * ${b} = ${multiply(a, b)}`)
console.log(`${a} * 2 = ${mBy2(a)}`)