import { useEffect, useState } from "react";
import { OPTIONS } from "../utils/constants";

const useMovieDetail = (id) => {
  const [movieDetail, setMovieDetail] = useState({});

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

      const [movieResponse, videoResponse, creditsResponse] = await Promise.all(
        [url, trailer, cast],
      )
        .then((response) => response)
        .catch((e) => e);

      const obj = {
        movieDetails: await movieResponse.json(),
        video: await videoResponse.json(),
        credits: await creditsResponse.json(),
      };
      setMovieDetail({ [id]: obj });
    }
    getMovieById();
  }, []);
  return { movie: movieDetail };
};

export default useMovieDetail;
