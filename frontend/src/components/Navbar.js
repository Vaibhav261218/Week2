import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context";

const Navbar = ({ onSearch }) => {
  const { user, logout } = useContext(AuthContext);
  const [keyword, setKeyword] = useState("");

  const handleSearchClick = () => {
    if (keyword.trim() && onSearch) {
      onSearch(keyword);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 shadow-lg text-white">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
          alt="Logo"
          className="h-10"
        />
        <span className="text-xl font-bold">Musicify</span>
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex-grow mx-4 flex justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for songs, artists, or albums..."
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 ease-in-out"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={handleSearchClick}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white rounded-full p-2 hover:bg-pink-400 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M11 17a6 6 0 1110 0 6 6 0 01-10 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Section: User Info or Auth Links */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative group">
            <img
              src="https://via.placeholder.com/150/000000/FFFFFF?text=U" // Replace with user profile image
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-pink-400"
            />
            <div className="absolute top-full right-0 mt-2 bg-white text-gray-700 rounded-md shadow-lg w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="p-2">
                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-left text-sm rounded-md hover:bg-gray-200"
                >
                  Logout
                </button>
                <button
                  onClick={() => console.log('Your Account clicked')}
                  className="block w-full px-4 py-2 text-left text-sm rounded-md hover:bg-gray-200"
                >
                  Your Account
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link to="/signup">
              <button className="px-5 py-2 bg-transparent text-pink-500 border border-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition duration-300">
                Sign up
              </button>
            </Link>
            <Link to="/signin">
              <button className="px-5 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-400 transition duration-300">
                Log in
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
