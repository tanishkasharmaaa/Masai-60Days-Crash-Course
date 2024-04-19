document.addEventListener('DOMContentLoaded', function() {
    let container = document.getElementById('container');
    let sort=document.querySelector('select'); 

    // fetch Data
    function Country_fetch(url) {
        fetch(url)
            .then((res) => res.json())
            .then((data) => displayData(data));
    }

     Country_fetch('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries');

     // Display Data
    function displayData(data) {
        container.innerHTML = ''; 
        data.data.forEach((ele, i) => {
            let main = document.createElement('div');
            let country = document.createElement('p');
            let rank = document.createElement('p'); 
            let population = document.createElement('p'); 

            country.innerText = `Country: ${ele.country}`; 
            rank.innerText = `Rank: ${ele.Rank}`; 
            population.innerText = `Population: ${ele.population}`; 

            main.style.backgroundColor = 'white';

            main.append(country, rank, population);
            container.append(main);
        });
    }
// adding event listener  on sort
    sort.addEventListener('change', function() {
        Sorting();
    });

// handling sort functionality
    function Sorting() {
        let val = sort.value;
        console.log(val)
        Country_fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?sort=population&order=${val}`);
    }
});
