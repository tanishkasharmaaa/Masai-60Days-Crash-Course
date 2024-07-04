const args=process.argv.slice(2);
const crypto=require('crypto')


let operations=args[0];
let numbers=args.slice(1).map(Number);

function calculate(operations,numbers){
let result;
switch(operations){
    case 'add':{
        result=numbers.reduce((acc,curr)=>acc+curr,0);
        break
    }
    case 'sub':{
        result=numbers.reduce((acc,curr)=>acc-curr);
        break
    }
case 'multiply':{
    result=numbers.reduce((acc,curr)=>acc*curr,1);
    break
}
case 'divide':{
    result=numbers.reduce((acc,curr)=>acc/curr)
    break
}
case 'sin':{
   if(numbers.length!==1){
    console.log(`Please provide exactly one number for sine operation`);
    process.exit(1)
   }
   result=Math.sin(numbers[0])
   break
}
case 'cos':{
    if(numbers.length!==1){
        console.log(`Please provide exactly one number for cosine operation`);
        process.exit(1)
    }
    result=Math.cos(numbers[0]);
    break
}
case 'tan':{
    if(numbers.length!==1){
        console.log(`Please provide one number for tangent operation`)
    }
    result=Math.tan(numbers[0]);
    break
}
case 'random':{
if(numbers.length!==1){
    console.log(`Provide length for random number generation`)
    process.exit(1)
}
let length=numbers[0];
let randomBytes=crypto.randomBytes(length).toString('binary');
console.log(`Random number of length ${length}: ${randomBytes}`)
return;
}
    default:
        console.log(`invalid operation`)
        process.exit(1)
}
console.log(`Result of ${operations}: ${result}`)
}
calculate(operations,numbers)