let form =document.querySelector('form');

form.addEventListener('submit',function(e){
    handleForm(e)
})

async function handleForm(e){
e.preventDefault();
let input =e.target;
let username=input[0].value;
let password=input[1].value;

try {
    let res=await fetch('http://localhost:3000/loginInfo');
    let data=await res.json();
    console.log(data)
    let findData=data.find((ele)=>ele.name===username&&ele.password===password);
    if(findData){
        localStorage.setItem('user',JSON.stringify(findData))
        window.location.href='product.html'
      return  alert('Login Successful')

    }
    else{
        return alert('Either username or password is incorrect')
    }
} catch (error) {
    console.log(error)
}
}