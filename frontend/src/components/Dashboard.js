import React, { useEffect, useState } from "react";
import Track from "../components/Track";
import Artist from "../components/Artist";

const Dashboard = ({ searchKeyword }) => {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [message, setMessage] = useState("");

  const API_HEADERS = {
    "x-rapidapi-key": "e0b1d5fe2bmsh0ca39ff845aa78fp16581bjsn58597e3ef3e4",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  };

  const fetchAPI = async (url) => {
    try {
      const response = await fetch(url, { method: "GET", headers: API_HEADERS });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      return data;
    } catch (error) {
      console.error("API Fetch Error:", error);
      setMessage("An error occurred. Please try again.");
      return null;
    }
  };

  const fetchTopTracksAndArtists = async (query) => {
    const SEARCH_API_URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;
    const data = await fetchAPI(SEARCH_API_URL);

    if (data?.data) {
      setTracks(data.data.slice(0, 10)); // Fetch the top 10 tracks
      const uniqueArtists = [
        ...new Map(data.data.map((track) => [track.artist.id, track.artist])).values(),
      ];
      setArtists(uniqueArtists.slice(0, 10)); // Fetch the top 10 unique artists
      setMessage(""); // Clear any error messages
    } else {
      setTracks([]);
      setArtists([]);
      setMessage("No results found.");
    }
  };

  // Random query for fetching data initially
  const getRandomQuery = () => {
    const RANDOM_QUERIES = [
      "arjit", "pritam", "atif", "kishor", "shreya", "kk", "alan walker", "rahman", "taylor", "selena"
    ];
    return RANDOM_QUERIES[Math.floor(Math.random() * RANDOM_QUERIES.length)];
  };

  // Use effect to trigger fetch when searchKeyword changes or on initial load
  useEffect(() => {
    if (searchKeyword) {
      fetchTopTracksAndArtists(searchKeyword); // Fetch based on search keyword
    } else {
      const randomQuery = getRandomQuery(); // Get a random query
      fetchTopTracksAndArtists(randomQuery); // Fetch tracks and artists based on random query
    }
  }, [searchKeyword]); // Effect runs when searchKeyword changes

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-black text-white">
      <div className="flex-grow p-6">
        {/* Display error message if there is any */}
        {message && <p className="text-red-500 font-semibold text-center">{message}</p>}

        {/* Top Artists Section */}
        <section>
          <h2 className="text-2xl font-extrabold text-blue-400 mb-4 border-b-2 border-blue-600 pb-2">Top Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {artists.map((artist) => (
              <Artist key={artist.id} artist={artist} />
            ))}
          </div>
        </section>

        {/* Top Tracks Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-extrabold text-purple-400 mb-4 border-b-2 border-purple-600 pb-2">Top Tracks</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {tracks.map((track) => (
              <Track key={track.id} track={track} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
