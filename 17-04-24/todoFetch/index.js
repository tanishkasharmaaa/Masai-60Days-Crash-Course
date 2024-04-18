let container = document.querySelector("#container");
let button = document.querySelector("button");

button.addEventListener("click", function () {
  fetchData();
});

// fetching data
function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then((data) => displayData(data));
}

// displaying data
function displayData(data){
data.forEach((ele,i)=>{

    //creating elements
    let main_div=document.createElement('div');
    let p =document.createElement('p');
let input=document.createElement('input');

// providing tags and text to elements 
p.innerText=ele.title;
input.type='checkbox';

// styling main dev
main_div.style.display='flex'


main_div.style.boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px;'
// appending elements to there respective containers
main_div.append(p,input);
container.append(main_div)
})
}