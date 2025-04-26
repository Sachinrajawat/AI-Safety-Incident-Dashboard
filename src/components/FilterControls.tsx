import React from 'react';
import { SeverityFilter, SortOrder } from '../types/incident';

interface FilterControlsProps {
  severityFilter: SeverityFilter;
  setSeverityFilter: React.Dispatch<React.SetStateAction<SeverityFilter>>;
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  severityFilter,
  setSeverityFilter,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label className="filter-label">Filter by Severity:</label>
        <div className="filter-buttons">
          {['All', 'Low', 'Medium', 'High'].map((level) => (
            <button
              key={level}
              onClick={() => setSeverityFilter(level as SeverityFilter)}
              className={`filter-button ${severityFilter === level ? 'active' : ''}`}
              aria-pressed={severityFilter === level}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      <div className="filter-group md:mb-0">
        <label className="filter-label">Sort by Date:</label>
        <div className="filter-buttons">
          <button
            onClick={() => setSortOrder('newest')}
            className={`filter-button ${sortOrder === 'newest' ? 'active' : ''}`}
            aria-pressed={sortOrder === 'newest'}
          >
            Newest First
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`filter-button ${sortOrder === 'oldest' ? 'active' : ''}`}
            aria-pressed={sortOrder === 'oldest'}
          >
            Oldest First
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
