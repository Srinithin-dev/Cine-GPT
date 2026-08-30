import { useSelector } from "react-redux";

const useMovieDetail = (id) => {
  const movieList = useSelector((state) => state.movie?.nowPlayingMovies);
  const movie = movieList && movieList.filter((movie) => movie.id == id);
  console.log(movie, "movieList");

  return { movie };
};

export default useMovieDetail;
