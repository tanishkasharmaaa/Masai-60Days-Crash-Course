let tbody = document.querySelector("tbody");
let SelDeptartment = document.getElementById("department");
let SelGender = document.getElementById("gender");
let SelSalary = document.getElementById("salary");
let previous=document.getElementById('prev');
let next=document.getElementById('next')

let StartPage=0;

next.addEventListener('click',function(){
    NextPage()
})

previous.addEventListener('click',function(){
   PreviousPage()
})


SelSalary.addEventListener("change", function () {
  selectSalary();
});

SelGender.addEventListener("change", function () {
  selectGender();
});

SelDeptartment.addEventListener("change", function () {
  selectDepartment();
});

 function selectSalary(data) {
 
 console.log(data)
 
    // let finalData = data;
   
    // let filterSalary = finalData.sort(function (a, b) {
    //   if (val === "asc") {
    //     return a.salary - b.salary;
    //   }
    //   if (val === "desc") {
    //     return b.salary - a.salary;
    //   }

     
    // })
    //  DisplayData(filterSalary)
}

async function selectGender() {
  let val = SelGender.value;
  try {
    let res = await fetch(
      "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees"
    );
    let data = await res.json();
    let finalData = data.data;
  

    let filterGender = finalData.filter((ele) => ele.gender === val);
    DisplayData(filterGender);
  } catch (error) {
    console.log(error);
  }
}

async function selectDepartment() {
  let val = SelDeptartment.value;
  try {
    let res = await fetch(
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees`
    );
    let data = await res.json();
    let finalData = data.data;
   
    let filterDepart = finalData.filter((ele) => ele.department === val);
    DisplayData(filterDepart);
  } catch (error) {
    console.log(error);
  }
}

async function getData(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    let finalData = data.data;
    let totalPage=data.totalPages;
   
    DisplayData(finalData);
  } catch (error) {
    console.log(error);
  }
}
getData(
  "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10"
);

function DisplayData(data) {
  tbody.innerHTML = "";
  data.forEach((ele, i) => {
    let tr = document.createElement("tr");
    let num = document.createElement("td");
    let name = document.createElement("td");
    let gender = document.createElement("td");
    let department = document.createElement("td");
    let salary = document.createElement("td");

    num.innerText = ele.id;
    name.innerText = ele.name;
    gender.innerText = ele.gender;
    department.innerText = ele.department;
    salary.innerText = ele.salary;

    tr.append(num, name, gender, department, salary);
    tbody.appendChild(tr);
  });
}



async function PreviousPage(){
  try {
    let res=await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${++StartPage}&limit=10`);
    let data=await res.json();
    
    DisplayData(data.data)
    selectSalary(data.data)
  } catch (error) {
    console.log(error)
  }
}

async function PreviousPage(){
  try {
    let res=await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${StartPage--}&limit=10`);
    let data=await res.json();
    
    DisplayData(data.data)
    selectSalary(data.data)
  } catch (error) {
    console.log(error)
  }
}