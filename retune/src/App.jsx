import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import VideoGrid from './components/VideoGrid';
import CategoryPickerModal from './components/CategoryPickerModal';
import Settings from './components/Settings';
import './App.css';

// this label fetches popular videos on YouTube
const searchCategoryLabel = 'Discover';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(searchCategoryLabel);
  const [customCategories, setCustomCategories] = useState([]);
  const [categoryVideos, setCategoryVideos] = useState({});
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // accessibility slider state
  const [showSettings, setShowSettings] = useState(false);
  const [accessibilityLevel, setAccessibilityLevel] = useState(1);

  // search input state
  const [searchQuery, setSearchQuery] = useState('');

  // "Add to Category" modal state
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [videoToCategorize, setVideoToCategorize] = useState(null);

  // Whenever accessibilityLevel changes, adjust document zoom
  useEffect(() => {
    document.documentElement.style.zoom = accessibilityLevel;
  }, [accessibilityLevel]);

  // Build YouTube search URL based on searchQuery
  const buildYouTubeURL = () => {
    const baseURL = 'https://www.googleapis.com/youtube/v3/search';
    const key = process.env.REACT_APP_YOUTUBE_API_KEY;
    const q = searchQuery.trim() || 'popular videos';
    const params = new URLSearchParams({
      part: 'snippet',
      maxResults: 20,
      type: 'video',
      key,
      q,
    });
    return `${baseURL}?${params.toString()}`;
  };

  // Fetch or load videos when selection or search changes
  useEffect(() => {
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
          setVideos([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchVideos();
    } else if (customCategories.includes(selectedCategory)) {
      setVideos(categoryVideos[selectedCategory] || []);
    } else {
      setVideos([]);
    }
  }, [selectedCategory, customCategories, categoryVideos, searchQuery]);

  // Create a new custom category via prompt
  const handleAddCustomCategory = () => {
    const newName = prompt('Enter a name for your new category:');
    if (!newName) return;
    if (newName === searchCategoryLabel || customCategories.includes(newName)) {
      alert('That category already exists.');
      return;
    }
    setCustomCategories((prev) => [...prev, newName]);
    setCategoryVideos((prev) => ({ ...prev, [newName]: [] }));
  };

  // Delete an existing custom category
  const handleDeleteCategory = (catName) => {
    setCustomCategories((prev) => prev.filter((c) => c !== catName));
    setCategoryVideos((prev) => {
      const updated = { ...prev };
      delete updated[catName];
      return updated;
    });
    if (selectedCategory === catName) {
      setSelectedCategory(searchCategoryLabel);
    }
  };

  // Reorder custom categories after drag-and-drop
  const handleReorderCustomCategories = (newOrder) => {
    setCustomCategories(newOrder);
  };

  // User clicked "+ Add to Category" on a video card
  const handleRequestAddToCategory = (video) => {
    setVideoToCategorize(video);
    setShowCategoryPicker(true);
  };

  // **UPDATED:** Add the video, switch to that category, and close the modal
  const handleChooseCategory = (catName, video) => {
    setCategoryVideos((prev) => {
      const existing = prev[catName] || [];
      if (existing.some((v) => v.id === video.id)) return prev;
      return { ...prev, [catName]: [...existing, video] };
    });

    // immediately switch to the new category tab
    setSelectedCategory(catName);

    setShowCategoryPicker(false);
    setVideoToCategorize(null);
  };

  // Called when user presses Enter in the search input
  const onSubmitSearch = () => {
    setSelectedCategory(searchCategoryLabel);
  };

  return (
    <div className="app-container">
      <Header
        searchQuery={searchQuery}
        onChangeSearchQuery={setSearchQuery}
        onSubmitSearch={onSubmitSearch}
        onOpenSettings={() => setShowSettings(true)}
      />

      <CategorySelector
        searchCategoryLabel={searchCategoryLabel}
        customCategories={customCategories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        onAddCustomCategory={handleAddCustomCategory}
        onDeleteCategory={handleDeleteCategory}
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

      {showSettings && (
        <Settings
          accessibilityLevel={accessibilityLevel}
          onChangeLevel={setAccessibilityLevel}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;
