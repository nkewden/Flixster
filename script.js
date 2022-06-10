//Constants
let pageNum = 1;
const pagelimit = 28;
// const offset = pageNum*pagelimit;
let searchTerm = '';

//API and URLs
const searchMovieUrl = "https://api.themoviedb.org/3/search/movie?api_key=";
const nowPlayingUrl = "https://api.themoviedb.org/3/movie/now_playing?&api_key=";
const apiKey = "b9241059a29f2558a0863649e677788d";

//Website Elements 
const loadMovies= document.querySelector(".load-more-movies-btn");
const movieCard = document.querySelector("#movie-card");
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('form');
const clearSearch = document.querySelector('.close-search-btn');
// const IMG_URL = 'https://image.tmdb.org/t/p/w500'



//The initial load of the website
async function initialLandingPage(searchQuery) {
    const response = await fetch(searchMovieUrl + apiKey + "&query=" + searchQuery + "&page=" + pageNum);
    const responseData = await response.json();
    const data = responseData.results
    // console.log("i'm here")
    data.forEach(element => displayMovies(element));
}


//where we fetch our movies to be able to display later 
async function getMovies(){
    const apiUrl = nowPlayingUrl + apiKey + "&q=" + searchTerm + "&language=en-US&page=" + pageNum;
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const data = responseData.results
    data.forEach(element => displayMovies(element));
}

//where we display the fetch movies on the screen
function displayMovies(event) {
    movieCard.innerHTML+= `
    <div class="movies">
    <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${event.poster_path} "alt=${event.title} width="190"/>
    <div class="movieDetails"
        <span class ="movie-title" style="color: white; "> ${event.title}</span> 
        <div class="movie-vote-wrapper">
        <span id="movie-votes" style="color: ${getColor(event.vote_average)};">${event.vote_average}<i style="color:${event.vote_average};" class="fa fa-star"></i> </span>
        </div> 
    </div>
    </div>
    `
}


//color rating based on the average vote 
function getColor (vote) {
    if (vote >= 7) {
        return 'green'
    }else if (vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

//to show more movies
function showMore(event){
    event.preventDefault();
    pageNum++;
    if (searchInput.value == ''){
        getMovies();
    }
    else {
        pageNum++;
        initialLandingPage(searchInput.value);
    }
} 


function clear(){
    movieCard.innerHTML = ''
    pageNum = 1
    // console.log("hello");
    getMovies();
    searchInput.value = '';
}


async function submit(event) {
    event.preventDefault();
    movieCard.innerHTML = '';
    searchTerm = searchInput.value;
    const results = await initialLandingPage(searchTerm);
    displayMovies(results);
    searchInput.value = '';

}

searchForm.addEventListener('submit', submit);
getMovies()

loadMovies.addEventListener("click", showMore);

clearSearch.addEventListener('click', clear);
