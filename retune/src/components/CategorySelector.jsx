// CategorySelector.jsx
import React from 'react';
import './CategorySelector.css';

function CategorySelector({ categories, selected, onSelect }) {
  return (
    <div className="category-selector">
      {categories.map(category => (
        <button
          key={category}
          className={`category-button ${selected === category ? 'selected' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategorySelector;