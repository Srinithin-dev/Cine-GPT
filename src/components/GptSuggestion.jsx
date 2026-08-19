import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptSuggestion = () => {
  const { movieResults, movieName } = useSelector(
    (state) => state.gpt.addGptMovieResult,
  );
  if (!movieResults) return null;
  console.log(movieResults, "movieResults");
  return (
    <div>
      GptSuggestion
      {movieResults.map((movies, index) => (
        <MovieList
          key={movies[0].title}
          title={movies[0].title}
          subtitle={movies[0].subtitle}
          movies={movies}
        />
      ))}
    </div>
  );
};

export default GptSuggestion;
