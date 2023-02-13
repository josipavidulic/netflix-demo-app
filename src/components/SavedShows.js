import { onSnapshot, updateDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { AiOutlineClose } from "react-icons/ai";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const userData = doc(db, "users", `${user?.email}`);

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft -= 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += 500;
  };

  useEffect(() => {
    onSnapshot(userData, (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email, userData]);

  const deleteMovie = async (id) => {
    try {
      const favouriteMovies = movies.filter((item) => item.id !== id);
      await updateDoc(userData, {
        savedMovies: favouriteMovies
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Movies</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="rounded-full left-0 bg-white opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <div
          id={"slider"}
          className="w-full h-full whitespace-nowrap overflow-x-scroll scroll-smooth scrollbar-hide"
        >
          {movies?.map((movie, id) => (
            <div
              key={id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative cursor-pointer p-2"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie?.img}`}
                alt={movie?.title}
              />
              <div className="top-0 left-0 w-full h-full absolute hover:bg-black/80 hover:opacity-100 opacity-0 text-white">
                <p className="whitespace-normal text-center font-bold text-xs md:text-sm h-full flex justify-center items-center">
                  {movie?.title} flex
                </p>
                <p
                  onClick={() => deleteMovie(movie.id)}
                  className="absolute top-4 right-4 text-gray-300 "
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="rounded-full right-0 bg-white opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
    </>
  );
};

export default SavedShows;
