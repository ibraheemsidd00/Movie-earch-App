import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = "http://www.omdbapi.com/?apikey=3ea6f7a1";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('Batman'); // State to hold search query

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovie(searchQuery); // Initial search on component mount
  }, [searchQuery]); // Dependency array ensures this effect runs on searchQuery change

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state on input change
  };

  return (
    <div className='app'>
      <h1>MovieSpace</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchQuery}
          onChange={handleSearchInputChange} // Update search query on input change
        />
        <img src={SearchIcon} alt="Search" onClick={() => searchMovie(searchQuery)} />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} /> // Ensure each child in a list has a unique key prop
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
