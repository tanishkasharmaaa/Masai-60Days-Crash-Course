let container = document.getElementById("container");
let userName = document.getElementById("username");
let addProd = document.getElementById("addProd");

let storeUser = JSON.parse(localStorage.getItem("user"));
userName.innerText = `Welcome ${storeUser.name}`;

addProd.addEventListener("submit", function (e) {
  AddNewProduct(e);
});

async function getData(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    displayData(data);
  } catch (error) {
    console.log(error);
  }
}
getData("http://localhost:3000/Products");

function displayData(data) {
  container.innerHTML = "";
  data.forEach((ele, i) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    let title = document.createElement("h4");
    let price = document.createElement("p");
    let addToCart = document.createElement("button");
    let edit = document.createElement("button");

    img.src = ele.src;
    title.innerText = ele.title;
    price.innerText = ele.price;
    addToCart.innerText = "Add to cart";
    edit.innerText = "Edit Product";

    addToCart.addEventListener("click", function () {
      handleCart(ele, i);
    });

    edit.addEventListener("click", function () {
      let form = document.createElement("form");
      let title = document.createElement("input");
      let image = document.createElement("input");
      let price = document.createElement("input");
      let submit = document.createElement("input");

      submit.type = "submit";
      title.placeholder = "product title";
      image.placeholder = "image link";
      price.placeholder = "product price";

      title.value = ele.title;
      image.value = ele.src;
      price.value = ele.price;

      form.append(title, image, price, submit);
      div.append(form);

      form.addEventListener("submit", async function (e) {
        e.preventDefault();
        let input = e.target;
        try {
          let res = await fetch(`http://localhost:3000/Products/${ele.id}`);
          let data = await res.json();
          let dataId = data.id;
          let formState = {
            id: dataId,
            title: input[0].value,
            src: input[1].value,
            price: parseFloat(input[2].value),
            ratings: data.ratings,
          };
          try {
            let res = await fetch(`http://localhost:3000/Products/${ele.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formState),
            });
            let Update_data = await res.json();
            console.log(Update_data);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      });
    });

    div.append(img, title, price, addToCart, edit);
    container.appendChild(div);
  });
}

async function handleCart(ele, i) {
  try {
    let res = await fetch("http://localhost:3000/allUsersCart");
    let data = await res.json();
    if (!data[storeUser]) {
      data[storeUser];
    }
    data[storeUser.name].push(ele);

    try {
      let res = await fetch("http://localhost:3000/allUsersCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let Update_data = await res.json();
      console.log(Update_data);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

async function AddNewProduct(e) {
  e.preventDefault();
  let input = e.target;
  try {
    let res = await fetch("http://localhost:3000/Products");
    let data = await res.json();
   
    let rates = Math.floor(Math.random() * 5);

    let obj = {
     
      title: input[0].value,
      src: input[1].value,
      price: input[2].value,
      ratings: rates,
    };

    try {
      let res2 = await fetch('http://localhost:3000/Products', {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Corrected "Content-Type" here
        body: JSON.stringify(obj),
      });
      let updated_data = await res2.json();
      console.log(updated_data);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
