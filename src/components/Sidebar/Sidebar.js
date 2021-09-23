import React from "react";
import PropTypes from "prop-types";
import "./Sidebar.scss";
import GENRES from "../../data/genres";

const Sidebar = props => {

  const { selectedGenre, setSelectedGenre, genres } = props;


  const handleGenreSelect = e => {

    setSelectedGenre(e.target.value);

  };


  return (
    <div className="sidebar_container">
      <div className="sidebar">
        <h2>Filter Movies</h2>
        <div>
          <label htmlFor="genre-select" className="filterLabel">
            Filter by genre
          </label>
          <select
            name="genres"
            id="genre-select"
            onChange={handleGenreSelect}
            value={selectedGenre.name}
          >
            {genres.map(genre => (
            <option value={genre.name}>{genre.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  genres: PropTypes.array.isRequired,
  selectedGenre: PropTypes.string,
  setSelectedGenre: PropTypes.func.isRequired,
};

export default Sidebar;
