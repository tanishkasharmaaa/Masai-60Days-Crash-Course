let info=[
	{
		grade: "V",
		students: [
			{name: "Nrupul", marks: [10, 20, 30]},
			{name: "Prateek", marks: [20, 30, 40]}
		]
	},
	{
		grade: "VI",
		students: [
			{name: "Aman", marks: [10, 20, 30]},
			{name: "Albert", marks: [20, 30, 40]}
		]
	},
	{
		grade: "VII",
		students: [
			{name: "Yogesh", marks: [10, 20, 30]},
			{name: "Sandhya", marks: [20, 30, 40]}
		]
	}
]

// V-Prateek-90
// VI-Albert-90
// VII-Sandhya-90

// for(let i=0;i<info.length;i++){
//     let max=-Infinity;
//     let highestScore;
//     let grade;
//    for(let j=0;j<info[i].students.length;j++){
//     let sum=0;
// for(let k=0;k<info[i].students[j].marks.length;k++){
//     sum+=info[i].students[j].marks[k]
// }
// if(max<sum){
//     max=sum;
// highestScore=info[i].students[j].name;
// grade=info[i].grade
// } 
//    }
//    console.log(grade+"-"+highestScore+"-"+max)
 
// }


// let name=["Nrupul", "Prateek", "Aman", "Albert", "Yogesh"]
// let age=[32, 30, 26, 28, 44]

// let arr=[]
// for(let i=0;i<name.length;i++){
// let obj={}

// obj.name=name[i];
// obj.age=age[i];
// arr.push(obj) 
// }
// let bag=""
// for(let i=0;i<arr.length;i++){
//  if(arr[i].age>30){
// bag+=arr[i].name+" ";

//  }
// }
// console.log(bag)


// Create a function to check if a number is Prime or Not
// function CheckPrime(n){
// 	if(n<=1) return false
// 	if(n<=3) return true

// 	if(n%2==0||n%3==0)return false
// 	for(let i=2;i*i<n;i++){
// 		if(n%i==0) return false
	  
// 	}
// return true
// }

// for(let i=0;i<20;i++){
// 	if(CheckPrime(i)==false){
// 		console.log(i)
// 	}
// }


// function CheckChar(char){
// 	let count=0
// 	let alpha='abcdefghijklmnopqrstuvwxyz';
// 	for(let i=0;i<alpha.length;i++){
// 		for(let j=0;j<char.length;j++){
// 			if(alpha[i]===char[j]){
// 				count++
				
// 			}
			
// 		}
// 		}
// 	if(count===char.length){
// 		console.log(char)
// 	}
// 	else{
// 		console.log(false)
// 	}
// }
// CheckChar('sdfg')

// function smallChar(char){
// 	let cap='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// 	let small='abcdefghijklmnopqrstuvwxyz';
// 	let res="";
// 	for(let i=0;i<char.length;i++){
// 		let active=false
// 		for(let j=0;j<small.length;j++){
//  if(char[i]==cap[j]){

// 	res+=small[j]
// 	active=true

//  }

	
// 		}
// 		if(!active){
// 			res+=char[i]
// 		}
	
// 	}
	
// 	console.log(res)
// }
// smallChar('TEST')




// Problem-1 Rectangle Object

// Create a rectangle object with length and width properties
// Create two methods area and perimeter, that will return the area and perimeter of the rectangle;



// let rectangle={
// 	length:20,
// 	width:40,
// 	perimeter:function(l=this.length,w=this.width){
// return ((l+w)*2)
// 	},
// 	area:function(l=this.length,w=this.width){
// 		return w*l
// 	}
// }

// console.log(rectangle.perimeter(40,50))
// console.log(rectangle.area(30,60))





// let item=["Rice", "Dal", "Salt"]
// let quantity=[2, 3, 1];
// let price=[60, 50, 20];
// let arr=[]
// for(let i=0;i<item.length;i++){
// 	let obj={};
// 	obj.item=item[i];
// 	obj.quantity=quantity[i];
// 	obj.price=price[i];
// arr.push(obj);


// }
// let sum=0
// for(let i=0;i<arr.length;i++){
// sum+=arr[i].quantity*arr[i].price;
// }
// console.log(sum)




// var sales = [
// 	{ item: 'PS4 Pro', stock: 3, original: 399.99 },
// 	{ item: 'Xbox One X', stock: 1, original: 499.99, discount: 0.1 },
// 	{ item: 'Nintendo Switch', stock: 4, original: 299.99 },
// 	{ item: 'PS2 Console', stock: 1, original: 299.99, discount: 0.8 },
// 	{ item: 'Nintendo 64', stock: 2, original: 199.99, discount: 0.65 }
//   ];
// let count=0
//   for(let i=0;i<sales.length;i++){
// if(!sales[i].discount){
// sales[i].sale=sales[i].original;
// sales[i].total=sales[i].stock*sales[i].sale;
// }
// else if(sales[i].discount){
// 	sales[i].sale=sales[i].original-(sales[i].original*sales[i].discount);
// 	sales[i].total=(sales[i].original-(sales[i].original*sales[i].discount))*sales[i].stock;

// }
//   }
// console.log(sales)






// let name=["Nrupul", "Prateek", "Aman", "Albert", "Yogesh"]
// let age=[32, 30, 26, 28, 44]
// let Array=[]
// let bag=""
// for(let i=0;i<name.length;i++){
// 	let obj={};
// 	obj.name=name[i];
// 	obj.age=age[i];
// 	Array.push(obj)
	
// 	if(obj.age>30){
// 		bag+=obj.name+" "
// 	}
	
// }
// console.log(bag)




// let arr=["cat","dog","bat","rat","snake","lizard","ant",'mosquitos'];

// Array.prototype.include=function(item){
// 	let included=false;
// for(let i=0;i<arr.length;i++){
// 	if(arr[i]===item){
// included=true
// 	}
// }
// console.log(included)
// }
// arr.include('cat')




let numbersArray = [2,3,7,8,10.13,15,18,34,25];

let doubledArray=numbersArray.map(ele=>ele*2);
console.log(doubledArray);

let evenNumbersArray=numbersArray.filter(ele=>ele%2===0);
console.log(evenNumbersArray)

let arr=[1,2,3,4,5]
let sum=numbersArray.reduce((acc,curr)=>{return acc+curr},0)
console.log(sum)