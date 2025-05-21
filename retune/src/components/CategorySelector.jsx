import React from 'react';
import './CategorySelector.css';

function CategorySelector({ categories, selected, onSelect }) {
  return (
    <nav className="category-selector">
      {categories.map(cat => (
        <button
          key={cat}
          className={cat === selected ? 'active' : ''}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}

export default CategorySelector;
