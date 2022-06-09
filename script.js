//https://api.themoviedb.org/3/movie/550?api_key=b9241059a29f2558a0863649e677788d

const apiKey = 'b9241059a29f2558a0863649e677788d';
const pages = 6;

var currentPage = 0;

const moviesCard = document.querySelector('.movie-card');
const movieGrid = document.querySelectorAll('#movies-grid');
const ShowMoreButton = document.getElementById('#show-more-btn');

document.addEventListener('submit', getMovies);

async function getMovies (movie){
    const diff = currentPage * pages;
    const response = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`)
}