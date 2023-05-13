import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { API_KEY, urlImage } from "../../GetAPI";
import "./MovieDetail.css";

function MovieDetail({ movieData }) {
  // luu
  const [isVideo, setIsVideo] = useState(false);
  const [keyVideo, setKeyVideo] = useState("");
  console.log(keyVideo);

  useEffect(() => {
    const urlMovieSever = `https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=${API_KEY}`;
    async function CallAPI() {
      try {
        await fetch(urlMovieSever)
          .then((res) => res.json())
          .then((data) => {
            if (data.results.length === 0) {
              setIsVideo(false);
            } else {
              setIsVideo(true);
              const videos = data.results.filter((item) => {
                return (
                  (item.site === "YouTube" && item.type === "Teaser") ||
                  item.type === "Trailer"
                );
              });
              const isTrailer = videos.filter(
                (item) => item.type === "Trailer"
              );
              if (isTrailer.length === 0) {
                setKeyVideo(videos[0].key);
              } else {
                setKeyVideo(isTrailer[0].key);
              }
            }
          });
      } catch (error) {}
    }
    // goi API
    CallAPI();
  });

  const opts = {
    height: "400",
    width: "650",
    playerVars: {
      autoplay: 200,
    },
  };

  return (
    <div className="trailer-container">
      <div key={movieData.id} className="trailer-des">
        <h2>{movieData.title} </h2>
        <hr />
        <h4>Release Date:{movieData.release_date}</h4>
        <h4>Vote: {movieData.vote_average}/10</h4>
        <p>{movieData.overview}</p>
      </div>
      <div className="video-trailer col-md=6">
        {isVideo ? (
          <YouTube videoId={keyVideo} opts={opts} />
        ) : (
          <img src={urlImage + movieData.backdrop_path || "#"} />
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
