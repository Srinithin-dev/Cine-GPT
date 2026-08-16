import { useDispatch } from "react-redux";
import { addMoviesList } from "../store/movieSlice";
import { useEffect } from "react";
import { OPTIONS } from "../utils/constants";

const usePlayingNowMovies = () => {
  const dispatch = useDispatch();
  const getMovieUrl = "https://api.themoviedb.org/3/movie/now_playing";

  useEffect(() => {
    async function getNowPlayingMovies() {
      const serializedData = await fetch(getMovieUrl, OPTIONS);
      const jsonData = await serializedData.json();
      dispatch(addMoviesList(jsonData.results));
    }
    getNowPlayingMovies();
  }, []);
};
export default usePlayingNowMovies;
