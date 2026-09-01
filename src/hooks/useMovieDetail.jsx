import { useEffect, useState } from "react";
import { OPTIONS } from "../utils/constants";

const useMovieDetail = (id) => {
  const [MovieDetail, setMovieDetail] = useState([]);

  useEffect(() => {
    async function getMovieById() {
      const url = await fetch(
        `https://api.themoviedb.org/3/movie/${id}`,
        OPTIONS,
      );
      const trailer = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        OPTIONS,
      );
      const cast = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        OPTIONS,
      );
      const data = new Promise((resolve, reject) => {
        console.log(resolve, "promise response");
      });
      console.log(await data, "data");
      Promise.all([url, trailer, cast]).then(async (res) => {
        console.log(res, "response");
      });
    }
    getMovieById();
  }, []);
  return { movie: MovieDetail };
};

export default useMovieDetail;
