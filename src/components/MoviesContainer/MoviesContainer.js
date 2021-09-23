import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../MovieCard/MovieCard";

const MoviesContainer = props => {
  const { movieData } = props;

  return <main className="movieContainer">
    {movieData.map(movie => (
      <MovieCard movie={movie} />
    ))}

  </main>;
};

MoviesContainer.propTypes = {
  movieData: PropTypes.array.isRequired
};

export default MoviesContainer;
