import React, { useState, useEffect } from "react";

import axios from "../../Utils/axios";
import requests from "../../Utils/request";

import './Banner.css'

const Banner = () => {
  const [movie, setMovie] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    fetchData();
  }, []);

  function truncate(str, n){
    return str?.length > n ? str.substr(0, n - 1) + "..." : str; 
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__btns">
          <button className="banner__btn">Play</button>
          <button className="banner__btn">My List</button>
        </div>
        <h1 className="banner__desc">{truncate(movie?.overview, 200)}</h1>
      </div>
      <div className='banner__fadebottom' />
    </header>
  );
};

export default Banner;
