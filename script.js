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
const loadMoreEl = document.querySelector('#load-more-movies-btn')

let pageNum = 1;





 async function initialLoad () {
    let apiUrl = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-04-09&primary_release_date.lte=2022-06-09&api_key=b9241059a29f2558a0863649e677788d'
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    displayResult(responseData);
    
}



async function getMovies () {
    if (search == null) {
    }else {
        searchWord = search.value.toLowerCase();
        movieCard.innerHTML = '';
     }
    let apiUrl = 'https://api.themoviedb.org/3/search/movie?page=' + pageNum + '&api_key=b9241059a29f2558a0863649e677788d' + '&query=' + searchWord; 
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    displayResult(responseData);
}


function displayResult(response) {
    
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

loadMoreEl.addEventListener("click", loadMore);

function loadMore(evt) {
   pageNum++;
   getMovies(evt);
}


form.addEventListener('submit', setUp);

initialLoad();

