import React from "react";

const Artist = ({ artist }) => {
  if (!artist) {
    return (
      <div className="text-center">
        <p>No Artist Data Available</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <img
        src={artist.picture || "https://via.placeholder.com/150"}
        alt={artist.name || "Unknown Artist"}
        className="w-full h-32 rounded mb-2"
      />
      <h6 className="text-sm font-medium">{artist.name || "Unknown Artist"}</h6>
      <p className="text-xs text-gray-400">
        Followers: {artist.nb_fan?.toLocaleString() || "N/A"}
      </p>
    </div>
  );
};

export default Artist;
