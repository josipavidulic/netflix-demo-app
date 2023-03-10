import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const NavigationBar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] absolute w-screen">
      <Link to="/">
        <h1 className="text-red-600 uppercase text-4xl cursor-pointer font-bold">
          Netflix
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="text-white pr-4">My List</button>
          </Link>

          <button
            onClick={handleLogOut}
            className="bg-red-600 px-6 py-2 rounded text-white cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-4">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded text-white cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
