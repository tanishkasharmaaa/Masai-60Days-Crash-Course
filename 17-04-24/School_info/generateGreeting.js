function generateGreeting(name,language='English'){
if(language==='English'){
    let greet='Hello'
    return `"${greet}, ${name}!"`
}
if(language==='Spanish'){
let greet ='iHola';
return `"${greet}, ${name}!"`
}
if(language==='French'){
    let greet='Bonjour';
    return `"${greet} , ${name}!"`
}
}

console.log(generateGreeting('Alice'))