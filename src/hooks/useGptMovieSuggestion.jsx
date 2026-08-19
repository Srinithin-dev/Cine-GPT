import { useDispatch } from "react-redux";
import { OPTIONS } from "../utils/constants";
import { getMovies } from "../store/gptSearchSlice";

const useGptMovieSuggestion = () => {
  const dispatch = useDispatch();
  async function fetchMovie(movie) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`;
    try {
      const response = await fetch(url, OPTIONS);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.log(error, "error");
    }
  }
  const gptSearchMovie = async (inputText) => {
    console.log(inputText, "inputText");
    const instructions = `
    You are CineGPT, an intelligent movie recommendation engine.
    Understand the user's natural-language request and recommend movies based on their
    genre, mood, themes, tone, storytelling style, and similarity to any movies they mention.
    User request:
    ${inputText}
    Rules:
  - Return up to 20 movies.
  - If fewer relevant movies are available, return only those movies.
  - Never invent movies.
  - Return ONLY the movie titles.
  - Separate each movie title with a comma.
  - No numbering.
  - No explanations.
  - No descriptions.
  - No years.
  - No ratings.
  - No markdown.
  - No introductory or concluding text.

    Example: Thuppakki, Anjaan, Inception, Interstellar, The Prestige`;

    // const response = await gemini.models.generateContent({
    //   model: "gemini-3.1-flash-lite",
    //   contents: instructions,
    // });
    // const result = response.candidates[0]?.content?.parts[0]?.text;
    const result = [
      "Shutter Island",
      "The Sixth Sense",
      "The Usual Suspects",
      "Fight Club",
      "Memento",
      "Oldboy",
      "The Others",
      "Gone Girl",
      "The Machinist",
      "Primal Fear",
      "Identity",
      "Orphan",
      "The Game",
      "Parasite",
      "Arrival",
      "Se7en",
      "Searching",
      "Incendies",
      "Get Out",
      "Psycho",
    ];

    const tmdbResults = result.map((movie) => fetchMovie(movie));
    const promiseArr = await Promise.all(tmdbResults);
    dispatch(getMovies({ movieName: result, movieResults: promiseArr }));
  };
  return gptSearchMovie;
};
export default useGptMovieSuggestion;
