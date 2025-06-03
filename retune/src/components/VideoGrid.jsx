import React from 'react';
import './VideoGrid.css';

function getCategoryIcon(category) {
  switch (category) {
    case 'Gaming':    return '🎮';
    case 'Education': return '📚';
    case 'Music':     return '🎵';
    case 'Travel':    return '🌍';
    case 'News':      return '📰';
    case 'Sports':    return '🏅';
    default:          return '🎬';
  }
}

function VideoGrid({ videos, onRequestAddToCategory }) {
  return (
    <div className="video-grid">
      {videos.map((video, index) => (
        <div key={index} className="video-card">
          {video.thumbnail && (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="video-thumbnail"
            />
          )}
          <div className="video-card-title">
            <span className="video-icon">
              {getCategoryIcon(video.category)}
            </span>
            <span className="video-title-text">{video.title}</span>
          </div>
          <button
            className="add-button"
            onClick={() => onRequestAddToCategory(video)}
          >
            + Add to Category
          </button>
        </div>
      ))}
    </div>
  );
}

export default VideoGrid;
