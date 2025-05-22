import React, { useState } from 'react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import VideoGrid from './components/VideoGrid';
import PlaylistModal from './components/PlaylistModal';
import { videos as allVideos } from './data/videos';
import './App.css';

const categories = ['All', 'Education', 'Travel', 'Music', 'Gaming', 'News', 'Sports'];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  const filteredVideos = selectedCategory === 'All'
    ? allVideos
    : allVideos.filter(video => video.category === selectedCategory);

  const handleAddToPlaylist = (video) => {
    if (!playlist.some(v => v.id === video.id)) {
      setPlaylist([...playlist, video]);
    }
  };

  return (
    <div className="app-container">
      <Header onOpenPlaylist={() => setShowPlaylist(true)} />
      <CategorySelector
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <VideoGrid
        videos={filteredVideos}
        onAddToPlaylist={handleAddToPlaylist}
      />
      {showPlaylist && (
        <PlaylistModal
          playlist={playlist}
          onClose={() => setShowPlaylist(false)}
        />
      )}
    </div>
  );
}

export default App;
