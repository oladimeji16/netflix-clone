import React, { useEffect, useState } from "react";

import Youtube from "react-youtube";
import movieTrailer from 'movie-trailer'
import axios from "../../Utils/axios";
import "./Rows.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";

const Rows = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('')

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

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoPlay: 1,
    },
  };

  const handleClick = (movie) => {
    if(trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.name || '')
      .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search)
        setTrailerUrl(urlParams.get('v'))
      }).catch((error) => console.error(error)) 
    }
  }

  return (
    <div className="row">
      {/* Tile */}
      <h2 className="row__title">{title}</h2>

      {/* container -> posters */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Rows;
