import React from 'react';

function SortMenu({ sortOption, setSortOption }) {
  return (
    <div className="mb-4 text-center">
      <select
        className="form-select w-auto d-inline-block"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Sort by</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="title-asc">Title: A → Z</option>
        <option value="title-desc">Title: Z → A</option>
      </select>
    </div>
  );
}

export default SortMenu;
