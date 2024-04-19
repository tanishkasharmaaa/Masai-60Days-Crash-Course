let container=document.getElementById('container');
let button=document.querySelector('button');

button.addEventListener('click',function(){
    FetchUserData('https://reqres.in/api/users')
     FetchUserData('https://reqres.in/api/users?page=2')
})
// fetching data
function FetchUserData(url){
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayData(data))
}

///displaying data
function displayData(data){

data.data.forEach((ele,i)=>{
    let main_div=document.createElement('div');
    let img=document.createElement('img');
    let name=document.createElement('p');
    let email=document.createElement('p')

main_div.className='user-card'

    img.src=ele.avatar;
    name.innerText=`${ele.first_name} ${ele.last_name}`
   email.innerText=ele.email
// appending
    main_div.append(img,name,email);
    container.append(main_div)
})
}