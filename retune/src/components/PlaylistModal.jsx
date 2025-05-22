// PlaylistModal.jsx
import React from 'react';
import './PlaylistModal.css';

function PlaylistModal({ onClose }) {
  return (
    <div className="playlist-modal">
      <button onClick={onClose} className="close-button">Close</button>
      <h2>Your Playlist</h2>
      <p>No videos yet. Start adding your favorites!</p>
    </div>
  );
}

export default PlaylistModal;