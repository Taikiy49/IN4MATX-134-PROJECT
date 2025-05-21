import React from 'react';
import './Header.css';

function Header({ onOpenPlaylist }) {
  return (
    <header className="header">
      <h1>reTune</h1>
      <button onClick={onOpenPlaylist}>Playlist</button>
    </header>
  );
}

export default Header;
