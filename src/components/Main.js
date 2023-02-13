import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";

const Main = () => {
  const [movies, setMovies] = useState([]);

  const backgroundMovie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const truncateString = (str, num) => {
    if(str?.length > num) {
        return str.slice(0, num) + '...';
    } else {
        return str;
    }
  }

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black" />
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${backgroundMovie?.backdrop_path}`}
          alt={backgroundMovie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
            <h1 className='text-3xl md:text-5xl font-bold'>{backgroundMovie?.title}</h1>
          <div className='my-4'>
            <button className="border bg-gray-300 border-gray-300 text-black py-2 px-5">
              Play
            </button>
            <button className="border border-gray-300 text-white py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className='text-gray-400 text-sm'>Released: {backgroundMovie?.release_date}</p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncateString(backgroundMovie?.overview, 200)}</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
