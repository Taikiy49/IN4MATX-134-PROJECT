// VideoGrid.jsx
import React from 'react';
import './VideoGrid.css';

function VideoGrid({ videos }) {
  return (
    <div className="video-grid">
      {videos.map((video, index) => (
        <div key={index} className="video-card">
          <img src={video.thumbnail} alt={video.title} />
          <div className="video-card-title">{video.title}</div>
        </div>
      ))}
    </div>
  );
}

export default VideoGrid;
