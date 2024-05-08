let form=document.querySelector('form');



form.addEventListener('submit',function(e){
    handleForm(e)
})

async function handleForm(e){
e.preventDefault();
let input=e.target;
let num=Math.floor(Math.random()*100)+1

let obj={
    id:num,
    name:input[0].value,
    email:input[1].value,
    password:input[2].value
}

    try {
        let res=await fetch('http://localhost:3000/loginInfo')
        let data=await res.json();
      let newFiltered=data.filter((ele)=>ele.name===obj.name)
      if(newFiltered.length>0){
       return alert('Username Already Exist')
      }
      try {
    let res=await fetch('http://localhost:3000/loginInfo',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(obj)
    })
    let data=await res.json();
    console.log(data)
    window.location.href='login.html'
    return alert('SignUp successfully , Please Login')
    
} catch (error) {
    console.log(error)
}
    } catch (error) {
        console.log(error)
    }
}





// console.log(newData)
