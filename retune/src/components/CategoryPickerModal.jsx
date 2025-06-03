import React from 'react';
import './CategoryPickerModal.css';

function CategoryPickerModal({
  customCategories,
  onClose,
  onChooseCategory,
  videoToCategorize,
}) {
  return (
    <div className="category-picker-backdrop">
      <div className="category-picker-modal">
        <h2>Select a Category</h2>
        {customCategories.length === 0 ? (
          <p>No custom categories yet. Click “+” above to create one first.</p>
        ) : (
          <ul className="category-list">
            {customCategories.map((cat) => (
              <li key={cat}>
                <button
                  className="category-item-button"
                  onClick={() => onChooseCategory(cat, videoToCategorize)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default CategoryPickerModal;
