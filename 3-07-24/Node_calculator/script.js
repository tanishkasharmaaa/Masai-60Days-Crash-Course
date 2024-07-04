// Import the crypto module
const crypto=require('crypto');
// Get command line arguments excluding the first two elements (node and script path)
const args=process.argv.slice(2);


// Extract the operation from the first argument
let operations=args[0];
// Convert the remaining arguments to numbers
let numbers=args.slice(1).map(Number);

// Function to perform calculations based on the operation and numbers provided
function calculate(operations,numbers){
let result;
switch(operations){
         
    case 'add':{
        // Add all numbers
        result=numbers.reduce((acc,curr)=>acc+curr,0);
        break
    }
    
    case 'sub':{
        // Subtract all subsequent numbers from the first number
        result=numbers.reduce((acc,curr)=>acc-curr);
        break
    }
     
case 'multiply':{
    // Multiply all numbers
    result=numbers.reduce((acc,curr)=>acc*curr,1);
    break
}

case 'divide':{
    // Divide the first number by all subsequent numbers
    result=numbers.reduce((acc,curr)=>acc/curr)
    break
}

case 'sin':{
    // Calculate the sine of a single number
   if(numbers.length!==1){
    console.log(`Please provide exactly one number for sine operation`);
    process.exit(1)
   }
   result=Math.sin(numbers[0])
   break
}
 
case 'cos':{
    // Calculate the cosine of a single number
    if(numbers.length!==1){
        console.log(`Please provide exactly one number for cosine operation`);
        process.exit(1)
    }
    result=Math.cos(numbers[0]);
    break
}
case 'tan':{
      // Calculate the tangent of a single number
    if(numbers.length!==1){
        console.log(`Please provide one number for tangent operation`)
    }
    result=Math.tan(numbers[0]);
    break
}
case 'random':{
    // Generate a random number of the specified length
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
        // Handle invalid operations
        console.log(`invalid operation`)
        process.exit(1)
}
  // Output the result of the operation
console.log(`Result of ${operations}: ${result}`)
}
// Call the calculate function with the extracted operation and numbers
calculate(operations,numbers)