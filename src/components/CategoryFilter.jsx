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
      {categories.map((category) => (
        <button
          key={category.slug}   // ✅ unique key (slug)
          className={`btn btn-outline-primary mx-1 ${selectedCategory === category.slug ? 'active' : ''}`}
          onClick={() => setSelectedCategory(category.slug)}
        >
          {category.name}  {/* ✅ show readable category name */}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
