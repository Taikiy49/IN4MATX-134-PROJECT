// Header.jsx
import React from 'react';
import './Header.css';

function Header({ onOpenPlaylist }) {
  return (
    <header className="header">
      <div className="header-title">ReTune</div>
      <div className="header-right">
        <button onClick={onOpenPlaylist} className="playlist-button">Playlist</button>
      </div>
    </header>
  );
}

export default Header;