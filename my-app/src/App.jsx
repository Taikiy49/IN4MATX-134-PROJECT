import React, { useState } from 'react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import VideoGrid from './components/VideoGrid';
import PlaylistModal from './components/PlaylistModal';
import { videos } from './data/videos';
import './App.css';

const categories = ['All', 'Education', 'Travel', 'Music', 'Gaming', 'News'];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPlaylist, setShowPlaylist] = useState(false);

  const filtered = selectedCategory === 'All'
    ? videos
    : videos.filter(v => v.category === selectedCategory);

  return (
    <div className="app-container">
      <Header onOpenPlaylist={() => setShowPlaylist(true)} />
      <CategorySelector
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <VideoGrid videos={filtered} />
      {showPlaylist && <PlaylistModal onClose={() => setShowPlaylist(false)} />}
    </div>
  );
}

export default App;
