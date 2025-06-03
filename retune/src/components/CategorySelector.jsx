import React from 'react';
import './CategorySelector.css';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

function CategorySelector({
  searchCategoryLabel,
  customCategories,
  selected,
  onSelect,
  onAddCustomCategory,
  onDeleteCategory,
  onReorderCustomCategories,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = customCategories.indexOf(active.id);
    const newIndex = customCategories.indexOf(over.id);
    const newOrder = arrayMove(customCategories, oldIndex, newIndex);
    onReorderCustomCategories(newOrder);
  };

  return (
    <div className="category-selector">
      <button
        key="__SEARCH__"
        className={`category-button ${
          selected === searchCategoryLabel ? 'selected' : ''
        }`}
        onClick={() => onSelect(searchCategoryLabel)}
      >
        {searchCategoryLabel}
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={customCategories}
          strategy={horizontalListSortingStrategy}
        >
          {customCategories.map((catName) => (
            <div key={catName} className="category-item">
              <SortableCategoryButton
                id={catName}
                selected={selected === catName}
                onClick={() => onSelect(catName)}
              >
                {catName}
              </SortableCategoryButton>
              <button
                className="delete-cat-button"
                onClick={() => onDeleteCategory(catName)}
              >
                🗑
              </button>
            </div>
          ))}
        </SortableContext>
      </DndContext>

      <button
        className="category-button add-category-button"
        onClick={onAddCustomCategory}
      >
        +
      </button>
    </div>
  );
}

export default CategorySelector;

function SortableCategoryButton({ id, selected, onClick, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`category-button ${
        selected ? 'selected' : ''
      } ${isDragging ? 'dragging' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
