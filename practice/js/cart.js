let container = document.getElementById('container');
let username = document.getElementById('username');
let store_user = JSON.parse(localStorage.getItem('user'));

async function getData(url) {
    try {
        let res = await fetch(url);
        let data = await res.json();
        let narr = data[store_user.name] || []; // Handle case where data for user does not exist
        displayData(narr);
    } catch (error) {
        console.log(error);
    }
}

getData('http://localhost:3000/allUsersCart');

function displayData(data) {
    container.innerHTML = '';
    data.forEach((ele, i) => {
        let div = document.createElement('div');
        let title = document.createElement('h3');
        let image = document.createElement('img');
        let price = document.createElement('p');
        let deleteBtn = document.createElement('button');

        title.innerText = ele.title;
        image.src = ele.src;
        price.innerText = ele.price;
        deleteBtn.innerText = 'Remove';

        deleteBtn.addEventListener('click', function() {
            Remove(ele);
        });

        div.append(image, title, price, deleteBtn);
        container.appendChild(div);
    });
}

async function Remove(ele) {
    try {
        let res = await fetch('http://localhost:3000/allUsersCart/' + ele.id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        let data = await res.json();
        let narr = data[store_user.name] || []; // Handle case where data for user does not exist
        displayData(narr);
    } catch (error) {
        console.log(error);
    }
}
