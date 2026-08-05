import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css'
import SearchPage from './pages/SearchPage';
import MovieDetails from './pages/MovieDetails';
import FavoritesPage from './pages/FavoritesPage';
import { useState } from 'react';
import { useEffect } from 'react';

function App()
{
  let favoriteList = localStorage.getItem("favorites");
  console.log("Favorites fetched from local storage",favoriteList);
  favoriteList = favoriteList ?  JSON.parse(favoriteList) : [] ;
  const [favorites , setFavorites] = useState(favoriteList);
  useEffect(() => {
    localStorage.setItem("favorites",JSON.stringify(favorites));
  }, [favorites]);
  function toggleFavorite(imdbId)
  {
    if(favorites.includes(imdbId))
    {
      setFavorites(favorites.filter((favorite) => {
         return favorite !== imdbId
      }));
    }
    else{
      setFavorites([...favorites,imdbId]);
    }
  }
  return (
  <BrowserRouter>
    <Routes>
      <Route
        path = "/"
        element = {<SearchPage 
                    favorites = {favorites}
                    toggleFavorite = {toggleFavorite}
                  />}
      />
      <Route
        path = "/movie/:id"
        element = {<MovieDetails 
                    favorites = {favorites}
                    toggleFavorite = {toggleFavorite}
                  />}
      />
      <Route 
        path = "/favorites"
        element = {<FavoritesPage
                    favorites = {favorites}
                    toggleFavorite = {toggleFavorite}
                  />}
      />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
