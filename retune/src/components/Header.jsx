import React from 'react';
import './Header.css';

function Header({
  searchQuery,
  onChangeSearchQuery,
  onSubmitSearch,
  onOpenSettings,
}) {
  return (
    <header className="header">
      <div className="header-title">ReTune</div>
      <input
        className="search-input"
        type="text"
        placeholder="Search YouTube…"
        value={searchQuery}
        onChange={(e) => onChangeSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmitSearch()}
      />
      <button onClick={onOpenSettings} className="settings-button">
        ⚙️
      </button>
    </header>
  );
}

export default Header;
