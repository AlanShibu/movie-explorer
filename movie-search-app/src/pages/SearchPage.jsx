import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

function SearchPage({favorites,toggleFavorite})
{
    const API_KEY = '39dfc73a' ;
    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log("Favorites list",favorites);

    async function searchMovies(params) {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchText}`);
            const data = await response.json();
            console.log(data);
            if (data.Response === 'True') {
                setMovies(data.Search);
            }
            else {
                setMovies([]);
                setError(data.Error);
            }
        }
        catch (e) {
            console.error("Error in fetching the movie data", e);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            { loading && (
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading movies..</p>
                </div>
            )}
            <div className='search-container'>
                <h1>Movie Search</h1>
                <div className="search-controls">
                    <div className='favorites-section'>
                        <Link
                            to={'/favorites'} className='favorites-link'
                        >
                            <span>❤️</span> 
                            <span>Favorites</span>
                        </Link>
                    </div>
                    <input type="text"
                        value={searchText}
                            placeholder='Search movies..'
                            onChange={(event) => {
                                setSearchText(event.target.value)
                            }}
                            onKeyDown = {(event) => {
                                if(event.key === 'Enter')
                                {
                                    if(searchText.trim() === '')
                                    {
                                        setError("Please enter something to search !");
                                        return;
                                    }
                                    searchMovies();
                                }
                            }}
                    />
                    <button onClick={searchMovies}>
                        Search
                    </button>
                </div>
            </div>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <div className='movie-list'>
                    {movies.map((movie) => {
                        const isFavorite = favorites.includes(movie.imdbID);
                        return (
                        <MovieCard
                            key={movie.imdbID}
                            imdbID={movie.imdbID}
                            title={movie.Title}
                            year={movie.Year}
                            poster={movie.Poster}
                            isFavorite={isFavorite}
                            toggleFavorite={toggleFavorite}
                        />)
                    })}
                </div>
        </>
    )
}

export default SearchPage;