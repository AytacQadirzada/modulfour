import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Components/Main";
import FavoriteList from "./Components/FavoriteList";
import Header from "./Components/Header";
import "./App.css";

const App = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [movieSearch, setMovieSearch] = useState('transformers');
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=${movieSearch}&apikey=c925ff06`)
      .then(res => res.json())
      .then(data => {
        setMovieData(data.Search || []);
      });
    }, [movieSearch]);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main 
              movieData={movieData} 
              favoriteList={favoriteList} 
              setFavoriteList={setFavoriteList} 
              inputValue={inputValue} 
              setInputValue={setInputValue}
              setMovieSearch={setMovieSearch}
            />
          }
        />
        <Route
          path="/favorite"
          element={<FavoriteList favoriteList={favoriteList} inputValue={inputValue} />}
        />
      </Routes>
    </div>
  );
};

export default App;
