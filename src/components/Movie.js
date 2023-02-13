import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Movie = ({ movie }) => {
  const [favourite, setFavourite] = useState(false);;
  const { user } = UserAuth();


  const saveMovieToFavourites = async () => {
    if(user?.email) {
      setFavourite(prevState => !prevState)
      await updateDoc(doc(db, 'users', `${user?.email}`), {
        savedMovies: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path
        })
      })
    }else {
      alert('Please log in to save a movie')
    }
  }

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative cursor-pointer p-2">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt={movie?.title}
      />
      <div className="top-0 left-0 w-full h-full absolute hover:bg-black/80 hover:opacity-100 opacity-0 text-white">
        <p className="h-full flex justify-center items-center whitespace-normal text-center font-bold text-xs md:text-sm">
          {movie?.title}
        </p>
        <p onClick={saveMovieToFavourites}>
          {favourite ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
