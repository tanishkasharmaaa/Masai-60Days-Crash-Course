
//         var arr=[1,2,3,4,5];
//     function double(arr){
// for(let i=0;i<arr.length;i++){
//     if(i%2==0){
//          arr[i]=arr[i]*2
//     }
 
    
// }

// return arr
//     }


//  var doubledVariable=double(arr);
//  let newArr;
//  for(let i=0;i<doubledVariable.length;i++){
//  newArr=doubledVariable
// }
// // console.log(newArr)



// {
//    var naam='mahima';
    
// }
// // console.log(naam)


// let obj={
//     name:"jatin",
//     age:12
// }
// obj.location=["C-55","Amanpuri","Nangloi"]

// for(let key in obj){
//     // console.log(key,"-",obj[key])
// }

// let obj2={
//     a:1,
//     b:2,
//     c:3,
//     d:4
// }

// for(let key in obj2){
//     if(obj2[key]%2==0){
//         // console.log(key+"-"+obj2[key])
//     }
// }


// let obj3={
//     firstName:"virat",
//     secondName:"kohli",
//     greet:function(){
//         console.log(this)
//         // console.log('hey there'+" "+this.firstName)
//     },
//     newStr: function() {
//     let name = this.firstName;
//     let str = " ";
//     for (let i = 0; i < name.length; i++) {
//         if (i % 2 == 0) {
//             str += '#';
//         } else {
//             str += name[i];
//         }
//     }
//     return str;
// }
// }

// let str='virat';
// let nstr=str.toUpperCase()
// let nstr2=nstr.toLowerCase();
// //console.log(nstr2)
// // obj3.greet()
// //obj3.greet()
// console.log(obj3.newStr())


let arr=[
    [1,2,3],
[4,5,6],
[7,8,9]
]

for(let i=0;i<arr.length;i++){
    let sum=0
    for(let j=0;j<arr[i].length;j++){
sum+=arr[i][j]
    }
 
}
 console.log(sum)  



