import React from 'react';
import './PlaylistModal.css';

function PlaylistModal({ playlist, onClose }) {
  return (
    <div className="playlist-modal">
      <button onClick={onClose} className="close-button">Close</button>
      <h2>Your Playlist</h2>
      {playlist.length === 0 ? (
        <p>No videos yet. Start adding your favorites!</p>
      ) : (
        <div className="playlist-items">
          {playlist.map((video, index) => (
            <div key={index} className="playlist-item">
              {video.thumbnail && (
                <img src={video.thumbnail} alt={video.title} className="playlist-thumbnail" />
              )}
              <div className="playlist-title">{video.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlaylistModal;
