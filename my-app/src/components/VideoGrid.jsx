
import React from 'react';
import VideoCard from './VideoCard';
import './VideoGrid.css';

function VideoGrid({ videos }) {
  return (
    <div className="video-grid">
      {videos.map(v => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  );
}

export default VideoGrid;
