let form=document.querySelector('form');
let userData;
fetch('http://localhost:3000/users')
.then(res=>res.json())
.then((data)=>{
userData=data
form.addEventListener('submit',function(e){
handleForm(e,userData)
})
})


function handleForm(e,userData){
e.preventDefault();
let input=e.target;
let username=input[0].value;
let password=input[1].value;
let obj={
    username:username,
    password:password
}
let userExist=userData.find(ele=>ele.name===username&&ele.password===password);


if(userExist){
window.location.href='products.html';
alert('You have loggedIn Successfully')
localStorage.setItem('user',JSON.stringify(obj))
}
else if(!userExist){
alert('Either username or password incorrect')
}
}