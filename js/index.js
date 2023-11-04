const apiKey = '1f4f8ab3';
const searchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=`;
const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=`;

const searchInput = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');
const favouritesList = document.getElementById('favourites');


let favourites = [];

// Function to render search results on the page
function renderSearchResults(movies) {
  searchResults.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <a href="#" onclick="openMoviePage('${movie.imdbID}')">
      <img src="${movie.Poster}" alt="${movie.Title}">
    </a>
      <button class="add-to-favourites" data-id="${movie.imdbID}">Add to favourites</button>
    `;
    searchResults.appendChild(movieCard);

  });
}

// Function to render favourite movies on the page
function renderFavourites() {
  favouritesList.innerHTML = '';

  favourites.forEach(movie => {
    const favouriteMovie = document.createElement('li');
    favouriteMovie.classList.add('favourite-movie');

    favouriteMovie.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
   
      <button class="remove-from-favourites" data-id="${movie.imdbID}">Remove</button>
    `;
    favouritesList.appendChild(favouriteMovie);
  });
}

// Function to fetch movie details by ID
async function getMovieById(movieId) {
  const response = await fetch(`${movieUrl}${movieId}`);
  const data = await response.json();
  return data;
}

// Event listener for search input
searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();

  if (query.length >= 3) {
    const response = await fetch(`${searchUrl}${query}`);
    const data = await response.json();

    if (data.Search) {
      renderSearchResults(data.Search);
    } else {
      searchResults.innerHTML = '<p>No results found</p>';
    }
  } else {
    searchResults.innerHTML = 'Please enter correct tilte name.';
  }
});

// Event listener for add to favourites button
searchResults.addEventListener('click', async event => {
  //It will returning true value.
  if (event.target.classList.contains('add-to-favourites')) {

    // const movieId = event.target.dataset.id;
    const movieId = event.target.getAttribute("data-id");
    const movie = await getMovieById(movieId);

    if (!favourites.some(f => f.imdbID === movie.imdbID)) {
      favourites.push(movie);
      localStorage.setItem('favourites', JSON.stringify(favourites));
      renderFavourites();
    }
  }
});

// Event listener for remove from favourites button
favouritesList.addEventListener('click', event => {
  if (event.target.classList.contains('remove-from-favourites')) {
    const movieId = event.target.dataset.id;
    favourites = favourites.filter(f => f.imdbID !== movieId);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    renderFavourites();
  }
});

// On page load, retrieve favourites from local storage and render them
const storedFavourites = JSON.parse(localStorage.getItem('favourites'));
if (storedFavourites) {
  favourites = storedFavourites;
  renderFavourites();
}

//Open movie information into the page.
function openMoviePage(imdbID) {
  window.open(`moviePage.html?id=${imdbID}`, '_blank');
}
