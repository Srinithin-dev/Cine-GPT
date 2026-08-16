import React, { useEffect } from "react";
import { OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
const useMovieTrailer = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie?.nowPlayingMovies);

  useEffect(() => {
    if (!movies?.length) return;

    const getMovie = movies[0];

    const getMovieVideos = async () => {
      const getMovieUrl = `https://api.themoviedb.org/3/movie/${getMovie.id}/videos`;

      const serializedData = await fetch(getMovieUrl, OPTIONS);
      const json = await serializedData.json();

      const filterData = json?.results?.filter(
        (video) => video.type?.toLowerCase() === "trailer",
      );

      const trailer = filterData?.length ? filterData[0] : json?.results?.[0];

      if (trailer) {
        dispatch(addTrailerVideo(trailer));
      }
    };

    getMovieVideos();
  }, [movies, dispatch]);
};

export default useMovieTrailer;
