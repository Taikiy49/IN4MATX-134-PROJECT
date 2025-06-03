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
  onReorderCustomCategories,
}) {
  // set up DnD sensors (pointer/touch); small activation distance avoids accidental drags
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // called by @dnd-kit when drag ends
  const handleDragEnd = (event) => {
    const { active, over } = event;
    // if dropped outside any valid droppable, or same position, do nothing
    if (!over || active.id === over.id) {
      return;
    }
    // find old & new index in customCategories
    const oldIndex = customCategories.indexOf(active.id);
    const newIndex = customCategories.indexOf(over.id);
    // reorder the array and notify parent
    const newOrder = arrayMove(customCategories, oldIndex, newIndex);
    onReorderCustomCategories(newOrder);
  };

  return (
    <div className="category-selector">
      {/*static “Discover” button*/}
      <button
        key="__SEARCH__"
        className={`category-button ${
          selected === searchCategoryLabel ? 'selected' : ''
        }`}
        onClick={() => onSelect(searchCategoryLabel)}
      >
        {searchCategoryLabel}
      </button>

      {/*draggable custom categories*/}
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
            <SortableCategoryButton
              key={catName}
              id={catName}
              selected={selected === catName}
              onClick={() => onSelect(catName)}
            >
              {catName}
            </SortableCategoryButton>
          ))}
        </SortableContext>
      </DndContext>

      {/*"+" button*/}
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
