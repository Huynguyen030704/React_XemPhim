import React, { useEffect, useState } from "react";
import { instance, requests } from "../../GetAPI";
// import requests from "../../requests";
import "./Banner.css";

const Banner = () => {
  //sate save background banner
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const request = await instance.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    //Call API
    getData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-Contents">
        <h1 className="banner-Title">
          {movie?.title || movie?.name || movie?.originam_name}
        </h1>
        <div className="banner-Buttons">
          <button className="banner-Button">Play</button>
          <button className="banner-Button">My List</button>
        </div>
        <h1 className="banner-Description">{truncate(movie?.overview)}</h1>
      </div>
    </header>
  );
};

export default Banner;
