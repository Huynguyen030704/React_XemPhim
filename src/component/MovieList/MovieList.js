import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./MovieList.css";
import { instance } from "../../GetAPI";
import MovieDetail from "../MovieDetail/MovieDetail";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
const baseUrl = "https://image.tmdb.org/t/p/original/";

// Video
const END_POINT = "https://api.themoviedb.org/3";
const API_KEY = "3a83747f443cd8fe65924581e0767e0e";

function MovieList({
  fetchUrl,
  title,
  isLargeRow,
  detailState,
  setDetailState,
  rowID,
}) {
  const [movies, setMovies] = useState([]);
  const [videoTrailer, setVideoTrailer] = useState({});

  const fetchData = async () => {
    try {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const slideLeft = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const handleClick = async (id) => {
    if (detailState.isOpen && detailState.activeId === id)
      return setDetailState({ activeId: null, isOpen: false });
    try {
      const result = await Promise.all([
        instance.get(`${END_POINT}/movie/${id}?api_key=${API_KEY}`),
        instance.get(`${END_POINT}/movie/${id}/videos?api_key=${API_KEY}`),
      ]);
      if (!result) {
        throw new Error("Movie ID is not found...");
      }
      const eligibleVideo = result[1].data.results.filter(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      );

      const key = eligibleVideo[0];
      console.log(key);

      result[1].data.key = { key: "" };
      console.log(result[1]);

      console.log(eligibleVideo[0]);
      setDetailState({ ...detailState, activeId: id, isOpen: true });
      setVideoTrailer(result[0].data);
    } catch (error) {
      console.log(error);
      return toast(
        "This movie has not Youtube trailer. Please select others!",
        {
          type: "error",
          position: "top-center",
          autoClose: 1000,
        }
      );
    }
  };

  return (
    <>
      <h2 className="MovieList-title">{title}</h2>
      <div className="MovieList-Containers ">
        <MdChevronLeft size={40} className="slideLeft " onClick={slideLeft} />
        <div id={"slider" + rowID} className="MovieList-Container">
          {movies &&
            movies.map((movie) => (
              <div className="Movie">
                <img
                  onClick={() => {
                    handleClick(movie.id);
                  }}
                  key={movie.id}
                  className="Movie-Img"
                  src={`${baseUrl}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              </div>
            ))}
        </div>
        <MdChevronRight size={40} className="slideRight" onClick={slideRight} />
      </div>
      {detailState.isOpen && detailState.activeId == videoTrailer.id && (
        <MovieDetail movieData={videoTrailer} />
      )}
    </>
  );
}
export default MovieList;
