import React from 'react';
import './Settings.css';

function Settings({ accessibilityLevel, onChangeLevel, onClose }) {
  return (
    <div className="settings-backdrop">
      <div className="settings-modal">
        <h2>Accessibility</h2>
        <label>
          Text Size:
          <input
            type="range"
            min="1"
            max="3"
            value={accessibilityLevel}
            onChange={(e) => onChangeLevel(e.target.value)}
          />
        </label>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
}

export default Settings;
