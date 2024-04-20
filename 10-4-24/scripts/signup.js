let form =document.querySelector('form');
let User=JSON.parse(localStorage.getItem('authentication'));



let data=[]

function saveData(data){
  localStorage.setItem('authentication',JSON.stringify(data))
}

function loadData(){
  let store=localStorage.getItem('authentication');
  if(store){
    data=JSON.parse(store)
  }
}


function handleFormSubmit(e){
e.preventDefault();
let input=e.target;
let user=input[0].value;
let email=input[1].value;
let password=input[2].value;
let confirm=input[3].value;

let filter_user=User.filter(ele=>ele.user===user);

console.log(filter_user)
if(filter_user.length>0){
 alert('user already exist')
}
else{

if(password===confirm){
  let obj={
  user:user,
  email:email,
  password:password
  
}
data.push(obj);
saveData(data)
alert('Registration Successful')
}
else{
  alert('password not matched')
}
 
  
}



}





form.addEventListener('submit',function(e){
handleFormSubmit(e)
})

loadData()
