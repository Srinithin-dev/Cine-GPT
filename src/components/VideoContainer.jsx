import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../store/movieSlice";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoContainer = () => {
  const dispatch = useDispatch();

  const trailerKey = useSelector((state) => state?.movie?.trailerVideo?.key);
  useMovieTrailer();
  return (
    <div>
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default VideoContainer;
