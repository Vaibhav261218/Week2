import React from "react";

const Track = ({ track }) => {
  if (!track) {
    return (
      <div className="text-center">
        <p>No Track Data Available</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <img
        src={track.album?.cover || "https://via.placeholder.com/150"}
        alt={track.title || "Unknown Track"}
        className="w-full h-32 rounded mb-2"
      />
      <h6 className="text-sm font-medium">{track.title || "Unknown Track"}</h6>
      <p className="text-xs text-gray-400">
        Artist: {track.artist?.name || "Unknown Artist"}
      </p>
      {track.preview ? (
        <audio controls className="mt-2 w-full">
          <source src={track.preview} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p className="text-xs text-gray-400">Preview not available</p>
      )}
    </div>
  );
};

export default Track;
