const API_KEY = 'api_key=b9241059a29f2558a0863649e677788d';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + 'discover/movie?primary_release_date.gte=2022-04-09&primary_release_date.lte=2022-06-09&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const form = document.querySelector('#form');
const search = document.querySelector('#search-input');
const moviesGrid = document.querySelector('#movies-grid');
const movieCard = document.querySelector('.movie-card');
const movieTitle = document.querySelector('.movie-title');
const movieImage = document.querySelector('.movie-poster');
const movieVotes = document.querySelector('.movie-votes');





 async function initialLoad () {
    let apiUrl = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-04-09&primary_release_date.lte=2022-06-09&api_key=b9241059a29f2558a0863649e677788d'
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    displayResult(responseData);
    
}



async function getMovies (event) {
    
    console.log(event)
    const searchWord = search.value;
    console.log(search)
    let apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=b9241059a29f2558a0863649e677788d' + '&query=' + searchWord; 
    console.log(apiUrl)
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    console.log(responseData)
    displayResult(responseData);
}


function displayResult(response) {
    movieCard.innerHTML = '';
    response.results.forEach(result => {
            movieCard.innerHTML += `

            <img class="movie-poster" src="${IMG_URL + result.poster_path}" alt="${result.title}">

            <div class="movie-title">
                <h3>${result.title}</h3>
                <span class="${getColor(result.vote_average)}">${result.vote_average}</span>
            </div>
            
            <div class="popup">
                <h3>Overview</h3>
                ${result.overview}
            </div>

            `

          });

}

function getColor (vote) {
    if (vote >= 8) {
        return 'green'
    }else if (vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

function setUp (event) {
    event.preventDefault();
    getMovies();
}


form.addEventListener('submit', setUp);

initialLoad();

