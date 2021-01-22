import React, { useEffect, useState } from "react";

import axios from "../../Utils/axios";
import "./Rows.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";

const Rows = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  //code run when row component loads
  useEffect(() => {
    const fetchData = async () => {
      // get data
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    };
    fetchData();
    //reload when content of url changes
  }, [fetchUrl]);

  return (
    <div className="row">
      {/* Tile */}
      <h2 className="row__title">{title}</h2>

      {/* container -> posters */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Rows;
