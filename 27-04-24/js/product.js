let container=document.querySelector('#container');
let userDisplay=document.getElementById('username');
let store_user=JSON.parse(localStorage.getItem('user'))
let previous=document.getElementById('prev');
let next =document.getElementById('next');
let page=document.getElementById('page')
userDisplay.innerText=store_user.username

let num=1;
page.innerText=num

previous.addEventListener('click',()=>{
    num--
    page.innerText=num;
    getData()
})

next.addEventListener('click',()=>{
    num++
    page.innerText=num
    getData()
})
function getData(){
    fetch(`http://localhost:3000/products?_page=${num}&_limit=2`)
.then(res=>res.json())
.then((data)=>{
let products=data;
ShowData(products)
})
.catch((err)=>console.log(err))

}

getData()

function ShowData(products){
    container.innerHTML=''
products.forEach((ele,i)=>{
    let main=document.createElement('div')
    let img=document.createElement('img');
    let price=document.createElement('p');
    let title=document.createElement('p');
    let rating=document.createElement('p')
    let addToCart=document.createElement('button');
    let deleteToCart=document.createElement('button');
let editData=document.createElement('button');

    img.src=ele.src;
    price.innerText=ele.price;
    title.innerText=ele.title;
    rating.innerText=ele.ratings;
    addToCart.innerText='Add to cart'
deleteToCart.innerText='Delete to cart'
editData.innerText='Edit to Data'

addToCart.addEventListener('click',function(){
   CartData(ele,i)
})
  
deleteToCart.addEventListener('click',function(){
    deleteData(ele,i)
})
   

    main.append(img,title,price,rating,addToCart,deleteToCart)
    container.appendChild(main);
})
}



async function CartData(el,i){
try {
    let res=await fetch('http://localhost:3000/allUsersCart');
    let data=await res.json();

    if(!data[store_user.username]){
    data[store_user.username]=[]
    }

    data[store_user.username].push(el);

    let updateRes=await fetch('http://localhost:3000/allUsersCart',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    })

    let updatedData=await updateRes.json();
console.log(updatedData)
} catch (error) {
    console.log(error)
}
}
async function deleteData(el, i) {
    try {
        let res = await fetch('http://localhost:3000/allUsersCart');
        let data = await res.json();
        
        
        let newData = data[store_user.username].filter(item => item.id !== el.id);

      
        let updatedData = {
            ...data,
            [store_user.username]: newData
        };

        
        let updatesRes = await fetch('http://localhost:3000/allUsersCart', {
            method: 'PUT', // Using PUT method for updating data
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        
        let responseData = await updatesRes.json();
        console.log(responseData);

    } catch (error) {
        console.log(error);
    }
}


