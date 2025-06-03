import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import VideoGrid from './components/VideoGrid';
import CategoryPickerModal from './components/CategoryPickerModal';
import './App.css';

// this label fetches popular videos on Youtube
const searchCategoryLabel = 'Discover';

function App() {
  // active category
  const [selectedCategory, setSelectedCategory] = useState(searchCategoryLabel);

  // user created categories (initially empty)
  const [customCategories, setCustomCategories] = useState([]);

  // mapping from each custom category -> array of saved videos
  // video object shape: { id, title, thumbnail, channel, category }
  const [categoryVideos, setCategoryVideos] = useState({});

  // array of videos to display in the grid
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // state for the "Add to Category" modal
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [videoToCategorize, setVideoToCategorize] = useState(null);

  // build YouTube search URL (only used if selectedCategory === "Discover")
  const buildYouTubeURL = () => {
    const baseURL = 'https://www.googleapis.com/youtube/v3/search';
    const key = process.env.REACT_APP_YOUTUBE_API_KEY;
    const params = new URLSearchParams({
      part: 'snippet',
      maxResults: 20,
      type: 'video',
      key,
      q: 'popular videos',
    });
    return `${baseURL}?${params.toString()}`;
  };

  // whenever selectedCategory changes, update "videos"
  useEffect(() => {
    // if "Discover", fetch popular videos from YouTube
    if (selectedCategory === searchCategoryLabel) {
      const fetchVideos = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const url = buildYouTubeURL();
          const res = await fetch(url);
          if (!res.ok) throw new Error(`YouTube API error: ${res.statusText}`);
          const data = await res.json();
          const mapped = data.items.map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails?.medium?.url || '',
            channel: item.snippet.channelTitle,
            category: searchCategoryLabel,
          }));
          setVideos(mapped);
        } catch (err) {
          console.error(err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchVideos();
    }
    // else, if it’s a custom category, show saved videos
    else if (customCategories.includes(selectedCategory)) {
      const saved = categoryVideos[selectedCategory] || [];
      setVideos(saved);
    }
    // otherwise, clear the grid
    else {
      setVideos([]);
    }
  }, [selectedCategory, customCategories, categoryVideos]);

  // create a new custom category via prompt
  const handleAddCustomCategory = () => {
    const newName = prompt('Enter a name for your new category:');
    if (!newName) return;

    if (newName === searchCategoryLabel || customCategories.includes(newName)) {
      alert('That category already exists.');
      return;
    }

    setCustomCategories((prev) => [...prev, newName]);
    setCategoryVideos((prev) => ({
      ...prev,
      [newName]: [],
    }));
  };

  // user clicked "+ Add to Category" on a video card
  const handleRequestAddToCategory = (video) => {
    setVideoToCategorize(video);
    setShowCategoryPicker(true);
  };

  // user picked a custom category in the modal
  const handleChooseCategory = (catName, video) => {
    setCategoryVideos((prev) => {
      const existing = prev[catName] || [];
      if (existing.some((v) => v.id === video.id)) {
        return prev;
      }
      return {
        ...prev,
        [catName]: [...existing, video],
      };
    });

    // if currently viewing that same category, append to "videos" grid
    if (selectedCategory === catName) {
      setVideos((prevGrid) => {
        if (prevGrid.some((v) => v.id === video.id)) return prevGrid;
        return [...prevGrid, video];
      });
    }

    setShowCategoryPicker(false);
    setVideoToCategorize(null);
  };

  // reorder the customCategories array when the user drags
  const handleReorderCustomCategories = (newOrder) => {
    setCustomCategories(newOrder);
  };

  return (
    <div className="app-container">
      <Header />

      <CategorySelector
        searchCategoryLabel={searchCategoryLabel}
        customCategories={customCategories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        onAddCustomCategory={handleAddCustomCategory}
        onReorderCustomCategories={handleReorderCustomCategories}
      />

      {isLoading && <p>Loading videos…</p>}
      {error && <p style={{ color: 'salmon' }}>Error: {error}</p>}

      <VideoGrid
        videos={videos}
        onRequestAddToCategory={handleRequestAddToCategory}
      />

      {showCategoryPicker && (
        <CategoryPickerModal
          customCategories={customCategories}
          onClose={() => setShowCategoryPicker(false)}
          onChooseCategory={handleChooseCategory}
          videoToCategorize={videoToCategorize}
        />
      )}
    </div>
  );
}

export default App;
