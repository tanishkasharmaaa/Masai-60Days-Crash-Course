
const text='./text.txt'
const fs =require('fs');
const process = require('process');
const args=process.argv.slice(2);

// Extract command-line arguments
let operation=args[0];   // The operation to perform (e.g., read, write, etc.)
let file=args[1];      // The file to operate on
let content=args[2]?args[2].toString():" ";  // Content to write or append
let newFileName=args[3];   // The new file name for renaming
// Function to perform the specified file operation
function operatingCommand(operation,file,content,newFileName){
let output;

switch(operation){
case 'read':{
     // Check if a file is provided
    if(!file){
        console.log('Please provide a file to read');
        process.exit(1)
    }
    // Check if the file exists
    if(!fs.existsSync(file)){
        console.log(`File ${file} does not exist`);
        process.exit(1)
    }
// Read and display the file content
output=fs.readFileSync(file,'utf-8');
console.log(`The content of "${file}" : ${output}`)
break
}
case 'create':{
      // Check if a file is provided
    if(!file){
        console.log('Provide a file to write in.');
        process.exit(1)
    }
     // Check if the file exists
    if(!fs.existsSync(file)){
console.log(`File ${file} does not exist`);
process.exit(1)
    }
     // Write content to the file
    let oldContent=fs.readFileSync(file,'utf-8');
    output=fs.writeFileSync(file,oldContent+'\n'+content,'utf-8');
    console.log(`The content of ${file} : \n${content}`)
    break
}
case 'rename':{
    // Check if file and new file name are provided
    if(!file||!newFileName){
        console.log('Provide a file name and new file name ');
        process.exit(1)
    }
    // Check if the file exists
    if(!fs.existsSync(file)){
console.log(`File ${file} does not exist`);
process.exit(1)

    }
     // Rename the file
output=fs.renameSync(file,newFileName);
console.log(`The class has changed from ${file} to ${newFileName}`)
break
}
case 'delete':{
     // Check if a file is provided
    if(!file){
        console.log('Provide a file to delete.');
        process.exit(1)
    }
    // Check if the file exists
    if(!fs.existsSync(file)){
console.log(`File ${file} does not exist`);
process.exit(1)
    }
          // Delete the file
    output=fs.unlinkSync(file);
    console.log(`File ${file} deleted`)
    break
}
case 'append':{
    // Check if a file is provided
    if(!file){
        console.log('Provide a file to append in.');
        process.exit(1)
    }
     // Check if the file exists
    if(!fs.existsSync(file)){
console.log(`File ${file} does not exist`);
process.exit(1)
    }
    // Append content to the file
    output=fs.appendFileSync(file,'\n'+content);
console.log(`Content ${content} append in file ${file}`)
break
}
case 'list':{
     // Check if a directory is provided
    if (!file) {
        console.log('Please provide a directory to list.');
        process.exit(1);
      }
       // Check if the directory exists and is a directory
      if (!fs.existsSync(file) || !fs.lstatSync(file).isDirectory()) {
        console.log(`Directory "${file}" does not exist.`);
        process.exit(1);
      }
      // List the contents of the directory
      const files = fs.readdirSync(file,'utf-8');
      
      console.log(`Contents of directory "${file}":`);
      files.forEach(f => console.log(f));
      break
}
default:{
     // Handle invalid operation
console.log(`invalid operation`);
process.exit(1)

}
}
}
// Call the function with the parsed arguments
operatingCommand(operation,file,content,newFileName)



