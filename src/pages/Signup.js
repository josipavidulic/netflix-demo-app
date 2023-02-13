import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", email), {
        savedMovies: [],
      });
      navigate("/");
    } catch(error) {
        setError(error.message)
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://mebincdn.themebin.com/1664271580523.jpg"
          alt="/"
        />
        <div className="bg-black/60 w-full h-screen top-0 left-0 fixed"></div>
        <div className="fixed w-full px-4 py-24 z-5">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font bold">Sign Up</h1>
              {error ? <p className='bg-red-400 my-2 p-3'>{error}</p> : null}
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                />
                <input
                  onChange={(event) => setPassword(event.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                />
                <button className="bg-red-600 rounded font-bold my-6 py-3">
                  Sign Up
                </button>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-500 mr-2">
                    Already subscribed to Netflix?
                  </span>
                  <Link to="/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
