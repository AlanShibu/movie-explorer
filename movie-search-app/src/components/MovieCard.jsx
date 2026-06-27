import { Link } from "react-router-dom";
function MovieCard ({imdbID, title,year,poster})
{
    return (
        <Link to={`/movie/${imdbID}`}>
            <div className="movie-card">
                <img src={poster} alt={title} />
                <h3>{title}</h3>
                <p>{year}</p>
            </div>
        </Link>)
}

export default MovieCard;