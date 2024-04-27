let form = document.querySelector("form");

let userData;
fetch('http://localhost:3000/users')
.then(res => res.json())
.then(data => {
    userData = data;
    form.addEventListener('submit', function(e) {
        handleForm(e, userData);
    });
})
.catch(err => console.log(err));

function handleForm(e, userData) {
    e.preventDefault();
    let input = e.target;
    
    // Get the last element's id directly
  let i=userData.length>0?userData[userData.length-1].id:0;
let newId=i+1
    let obj = {
        id: newId,
        name: input[0].value,
        email: input[1].value,
        password: input[2].value,
    };

    let userExist = userData.find(ele => ele.name === obj.name);
    if (userExist) {
        alert('User already exists');
    } else {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
        .then((res) => res.json())
        .then((data) => {
          window.location.href='login.html'  
        alert('Signup Successfully ,Please Login')
        
        })
        .catch((err) => console.log(err));

        
    }
}
