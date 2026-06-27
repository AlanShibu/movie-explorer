import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css'
import SearchPage from './pages/SearchPage';
import MovieDetails from './pages/MovieDetails';

function App()
{
  return (
  <BrowserRouter>
    <Routes>
      <Route
        path = "/"
        element = {<SearchPage />}
      />
      <Route
        path = "/movie/:id"
        element = {<MovieDetails />}
      />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
