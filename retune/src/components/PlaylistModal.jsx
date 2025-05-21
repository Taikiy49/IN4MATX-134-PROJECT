import React from 'react';
import { videos } from '../data/videos';
import './PlaylistModal.css';

function PlaylistModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="playlist-modal">
        <h2>Your Playlist</h2>
        <ul>
          {videos.slice(0, 3).map(v => (
            <li key={v.id}>{v.title}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PlaylistModal;
