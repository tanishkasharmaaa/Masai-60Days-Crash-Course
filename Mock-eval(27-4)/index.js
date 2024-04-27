// Taking catch hold of html tags
let container = document.getElementById("container");
let category = document.getElementById("category");
let priceFilter = document.getElementById("price");
let form = document.getElementById("search");

// adding event listener
form.addEventListener("input", handleSearch);

category.addEventListener("change", function () {
  handleCategory();
});

priceFilter.addEventListener("change", function () {
  PriceFilter();
});

// handeling search functionality
async function handleSearch() {
  let search = form.value.trim().toLowerCase(); // taking value from search input
  try {
    // fetching the data
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();// converting in json format
    if (search == " ") {// checking if search input empty then
      return displayData(data); // display complete data
    }

    let newData = data.filter((ele) =>
      ele.title.toLowerCase().includes(search)
    ); //checking if ele title is included in the data
    displayData(newData); // passing newData (filtered)data to display data
  } catch (error) {// cating the error here
    console.log(error);
  }
}
// price filter
async function PriceFilter() {
  let val = priceFilter.value; // get value of priceFilter
  
  try {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();// converting in json format
    let newData = data.sort(function (a, b) {
      if (val === "asc") {
        // checking if val is 'asc'
        return a.price - b.price; // then return price form a(low) to b(high)
      }
      if (val === "desc") {
        // checking if val is 'desc'
        return b.price - a.price; // then return price from b(high) to a(low)
      }
    });
    displayData(newData);// passing data from display newData
  } catch (error) {// catching error here
    console.log(error);
  }
}

async function handleCategory() {
  let CatVal = category.value; //taking the category value
 
  try {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json(); // converting in json format
    if(CatVal==='all Products'){// checks if catValue is === 'all Product'
return displayData(data)// passing data from display data

    }
    let newData = data.filter((ele) => ele.category === CatVal); //checking if CatVal is preset in data or not
    displayData(newData);// passing data from display data
  } catch (error) {// catching error
    console.log(error);
  }
}
/// fetching the url
async function getData(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();// converting in json format
    displayData(data);// passing data from display data
  } catch (error) {// catching error here
    console.log(error);
  }
}
getData("https://fakestoreapi.com/products");

// displaying the data
function displayData(data) {
  container.innerHTML = "";
  data.map((ele) => {
    // creating the elements
    let div = document.createElement("div");
    let img = document.createElement("img");
    let title = document.createElement("p");
    let price = document.createElement("p");
    // providing styling title
    title.style.fontSize = "20px";
    title.style.fontWeight = "600";

    // providing elements to tags
    img.src = ele.image;
    title.innerText = ele.title;
    price.innerText = "price : $" + parseFloat(ele.price);
    // appending newly created elements to div
    div.append(img, title, price);
    // appending div container
    container.appendChild(div);
  });
}
