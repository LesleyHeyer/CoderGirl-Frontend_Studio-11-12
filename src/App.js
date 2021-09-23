import React, { useState, useEffect, useReducer } from "react";
import Header from "./components/Header/Header";
//Import Sidebar and MovieContainer
import GENRES from "./data/genres";
import "./App.css";
import MoviesContainer from "./components/MoviesContainer/MoviesContainer";
import Sidebar from './components/Sidebar/Sidebar';

const movieDataReducer = (state, action) => {
  switch (action.type) {
    //SET_MOVIES will completely replace the current state with the value passed via `action.value`
    case "SET_MOVIES":
      return action.value;
    case "FILTER_MOVIES":
      return (
        action.allMovies.filter(movie => {
          let filteredGenres = [];
          filteredGenres = movie.genre.filter(genre => genre.name === action.selectedGenre); 
          return filteredGenres.length !== 0 ? true : false; 
        })
      );
    default:
      return state;
  }
};

const App = () => {
  const [staticMovieData, setStaticMovieData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState({id: 0, name:''});

  const [movieData, movieDataDispatch] = useReducer(movieDataReducer, []);


  //Part 1.a
  //Add a useEffect to fetch the movie data and update the staticMovieData state
  //This useEffect should only run once

  useEffect(() => {
    fetch('https://getpantry.cloud/apiv1/pantry/5daec432-c358-442e-bbac-be944968a126/basket/movies')
   .then(res => res.json()) //turns raw data into json
   .then(res => {
     movieDataDispatch({ type: 'SET_MOVIES', value: res.movieData });
     setStaticMovieData(res.movieData);
   }) //or do whatever you want to the data
   .catch(err => console.error(err => console.error(err)));  //It's always good to add error handling when dealing with external calls
  }, []); 
  
  //Part 4.b
  //Add a useEffect that will update the movieData reducer state to only hold movies that
  //have the selected genre. It should run whenever selectedGenre is changed AND when staticMovieData changes

  useEffect(() => {
    if (staticMovieData.length !== 0) {
      if (selectedGenre === '') {
        movieDataDispatch({
          type: "SET_MOVIES",  
          allMovies: staticMovieData
        }) } else {
          movieDataDispatch({
            type: 'FILTER_MOVIES',
            selectedGenre,
            allMovies: staticMovieData
          })
        }
      }
      setSidebarOpen(false);
    
  }, [selectedGenre, staticMovieData]);



  return (
    <div className="App">
      <Header setSidebarOpen={setSidebarOpen} />
      {sidebarOpen ? 
        <Sidebar 
          genres={GENRES} 
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
       /> : ""}
      <MoviesContainer movieData={movieData} />
    </div>
  );
};

export default App;
