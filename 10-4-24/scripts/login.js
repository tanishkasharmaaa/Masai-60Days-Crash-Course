let form=document.querySelector('form');
let info=JSON.parse(localStorage.getItem('authentication'))

function handleFormSubmit(e){
e.preventDefault();
let input=e.target;
let email=input[0].value;
let password=input[1].value;

let auth_filter=info.filter((ele)=>ele.email===email&&ele.password===password)

if(auth_filter.length>0){
    alert('logged in');
    window.location.href='home.html'
}
else{
    alert('Invalid email or password')
}
}


form.addEventListener('submit',function(e){
handleFormSubmit(e)
})

