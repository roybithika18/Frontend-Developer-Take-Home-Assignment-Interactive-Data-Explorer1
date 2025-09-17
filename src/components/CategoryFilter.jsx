import React from 'react';

function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="mb-4 text-center">
      {/* All button */}
      <button
        className={`btn btn-outline-primary mx-1 ${selectedCategory === 'all' ? 'active' : ''}`}
        onClick={() => setSelectedCategory('all')}
      >
        All
      </button>

      {/* Category buttons */}
      {categories.map(category => (
        <button
          key={category.slug || category.name || category}  // unique key
          className={`btn btn-outline-primary mx-1 ${selectedCategory === (category.slug || category.name || category) ? 'active' : ''}`}
          onClick={() => setSelectedCategory(category.slug || category.name || category)}
        >
          {category.name || category}  {/* Render name or string */}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
