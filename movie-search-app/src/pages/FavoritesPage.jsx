import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = '39dfc73a';
function FavoritesPage({ favorites, toggleFavorite }) {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    useEffect(() => {
        if (favorites.length === 0) {
            setFavoriteMovies([]);
            return;
        }
        async function loadFavoriteMovies()
        {
            const movies = [];
            for (const imdbID of favorites)
            {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
                const data = await response.json();
                movies.push(data);
            }
            setFavoriteMovies(movies);
        }
        loadFavoriteMovies();
    }, [favorites]);
    return (
        <>
            <h1>Favorites Page</h1>
            <div className="favorite-movies-container">
                {favoriteMovies.map((favoriteMovie) => {
                    return (
                        <MovieCard
                            key = {favoriteMovie.imdbID}
                            imdbID = {favoriteMovie.imdbID}
                            title = {favoriteMovie.Title}
                            year = {favoriteMovie.Year}
                            poster = {favoriteMovie.Poster}
                            isFavorite = {true}
                            toggleFavorite = {toggleFavorite}
                        />
                    )
                })}
            </div>
        </>
    )
}
export default FavoritesPage;