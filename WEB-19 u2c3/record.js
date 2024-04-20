// fill in javascript code here
let employeesData = [];
let container = document.getElementById("container");
  let form=document.querySelector('form')
  let tbody=document.querySelector('tbody');
let select=document.querySelector('#filter');
let data=JSON.parse(localStorage.getItem('details'))

select.addEventListener('change',function(){
  filter()
})
  
function filter(){
  let val=select.value;
  if(val===''){
ShowData()
  }
  else{
    let filtering=data.filter(ele=>ele.department===val);
   displayFilteredData(filtering)
  }
}

function saveData(data){
    localStorage.setItem('details',JSON.stringify(data))
}

function loadData(){
    let store=localStorage.getItem('details');
    if(store){
        employeesData=JSON.parse(store)
    }
}


function displayFilteredData(filtering){
  tbody.innerHTML=''
   filtering.forEach((ele, i) => {
  let tr = document.createElement("tr");
  let name = document.createElement("td");
  let employeeId = document.createElement("td");
  let department = document.createElement("td");
  let experience = document.createElement("td");
  let email = document.createElement("td");
  let mobile = document.createElement('td');
  let role= document.createElement('td');
  let deleteBtn=document.createElement('td');
  let btn = document.createElement("button");

  btn.innerText='Delete'
  btn.addEventListener('click',function(){
    handleDelete(i)
  
  })



  name.innerText=ele.name;
  employeeId.innerText=ele.employeeId;
  department.innerText=ele.department;
  experience.innerText=ele.experience;
  email.innerText=ele.email;
  mobile.innerText=ele.mobile;

  let exp=parseInt(ele.experience)
  if(exp>5){
    role.innerText='Senior'
  }
  else if(exp>=2&&exp<=5){
role.innerText='Junior'
  }
else {
role.innerText='Fresher'
}

  deleteBtn.append(btn)
  tr.append(name,employeeId,department,experience,email,mobile,role,deleteBtn);
tbody.append(tr)
});
}



 function ShowData(){
    tbody.innerHTML=''
     employeesData.forEach((ele, i) => {
    let tr = document.createElement("tr");
    let name = document.createElement("td");
    let employeeId = document.createElement("td");
    let department = document.createElement("td");
    let experience = document.createElement("td");
    let email = document.createElement("td");
    let mobile = document.createElement('td');
    let role= document.createElement('td');
    let deleteBtn=document.createElement('td');
    let btn = document.createElement("button");
 
    btn.innerText='Delete'
    btn.addEventListener('click',function(){
      handleDelete(i)
    
    })
  
  
  
    name.innerText=ele.name;
    employeeId.innerText=ele.employeeId;
    department.innerText=ele.department;
    experience.innerText=ele.experience;
    email.innerText=ele.email;
    mobile.innerText=ele.mobile;

    let exp=parseInt(ele.experience)
    if(exp>5){
      role.innerText='Senior'
    }
    else if(exp>=2&&exp<=5){
role.innerText='Junior'
    }
else {
role.innerText='Fresher'
}
  
    deleteBtn.append(btn)
    tr.append(name,employeeId,department,experience,email,mobile,role,deleteBtn);
  tbody.append(tr)
  });
  }


  function handleDelete(ele){
employeesData.splice(ele,1)
saveData(employeesData)
ShowData()
  }

 function handleFormSubmit(e){
e.preventDefault();
let input=e.target;
let name = input[0].value;
    let employeeId = input[1].value;
    let department = input[2].value;
    let experience = input[3].value;
    let email = input[4].value;
    let mobile = input[5].value;
    

let obj={
    name:name,
    employeeId:employeeId,
    department:department,
    experience:experience,
    email:email,
    mobile:mobile
}
employeesData.push(obj)
console.log(employeesData)
saveData(employeesData)
ShowData()

name.innerText=null
role.innerText=null
Department.innerText=null
 }


 form.addEventListener('submit',function(e){
    handleFormSubmit(e)
 })

window.addEventListener('DOMContentLoaded',function(){
    loadData();
   ShowData() 
})