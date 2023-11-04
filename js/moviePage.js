
const moviePage = document.getElementById('movie-info');

async function getMovieById(movieId) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
    const data = await response.json();
    return data;
  }


const currentUrl = window.location.href;
// Parse the URL
const url = new URL(currentUrl);
const id = url.searchParams.get('id');
const movieDetails = getMovieById(id);
movieDetails.then((movie) => {
    moviePage.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}">
    <h2>Movie Title : ${movie.Title} </h2>
    <h3>Actors Name : ${movie.Actors} </h3>
    <p> Plot : ${movie.Plot} </p>
    <p> Year : ${movie.Year}</p>
  `
  });