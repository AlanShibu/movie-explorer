import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MovieDetails()
{
    const API_KEY= '39dfc73a';
    const { id } = useParams();
    const [ movie , setMovie ] = useState(null);
    const [ loading , setLoading] = useState(false);
    const [ error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchMovieData();
    }, [id]);

    async function fetchMovieData()
    {
        try{
            setLoading(true);
            setError(false);
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
            const data = await response.json();
            if(data.Response === 'True')
            {
                setMovie(data);
            }
            else{
                setError(null);
            }
            console.log(data);
        }
        catch(error)
        {
            console.error(error);
        }finally{
            setLoading(false);
        }
    }
    return (
        <>  
            <button className="back-to-search-btn" onClick={() => navigate('/')}>
                ←  Back to Search
            </button>
            {loading && (
                <div className="loading-sate">
                    <div className="loading-spinner"></div>
                    <p>Loading movie details..</p>
                </div>
            )}
            {error && <p>{error}</p>}
            {movie && (
                <>
                    <div className="movie-container">
                        <div className="movie-header">
                            <img src= {movie.Poster} alt= {movie.Title} />
                            <div className="movie-details">
                                <h1>{movie.Title}</h1>
                                <p>⭐ {movie.imdbRating}</p>
                                <p>{movie.Genre}</p>
                                <p>{movie.Year} • {movie.Runtime}</p>
                                <p>Directed by {movie.Director}</p>
                            </div>
                        </div>
                        <div className="movie-content">
                            <h2>Plot</h2>
                            <p>{movie.Plot}</p>
                            <h2>Actors</h2>
                            <p>{movie.Actors}</p>
                            <h2>Awards</h2>
                            <p>{movie.Awards}</p>
                        </div>
                    </div>
                </>)
            }
        </>
    )

}

export default MovieDetails;