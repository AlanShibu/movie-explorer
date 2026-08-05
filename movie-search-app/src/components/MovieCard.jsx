import { Link } from "react-router-dom";
function MovieCard ({imdbID, title,year,poster,isFavorite,toggleFavorite})
{
    return (
        <Link to={`/movie/${imdbID}`} className="movie-card-link">
            <div className="movie-card">
                <img src={poster} alt={title} />
                <h3>{title}</h3>
                <span onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleFavorite(imdbID)
                }}>{isFavorite ? "❤️" : "♡"}</span>
                <p>{year}</p>
            </div>
        </Link>)
}

export default MovieCard;