import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortOrder, addFilter, removeFilter } from '../../store/filterSlice';
import './FilterSection.css';

export default function FilterSection() {
  const dispatch = useDispatch();
  const { activeFilters, options, sortOrder } = useSelector(state => state.filters);
  
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleAddFilter = (type, label) => {
    dispatch(addFilter({ type, label }));
    setOpenDropdown(null);
  };

  return (
    <div className="filter-section">
      <div className="filter-controls">
        {Object.keys(options).map(type => (
          <div key={type} className="dropdown-wrapper">
            <button 
              className={`filter-dropdown ${openDropdown === type ? 'active' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === type ? null : type)}
            >
              {type} <span className="chevron">▼</span>
            </button>

            {openDropdown === type && (
              <ul className="dropdown-menu">
                {options[type].map(opt => (
                  <li key={opt} onClick={() => handleAddFilter(type, opt)}>
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="active-tags">
        {activeFilters.map(filter => (
            <div key={filter.id} className="filter-tag">
            <span>{filter.label}</span>
            <button className="tag-remove" onClick={() => dispatch(removeFilter(filter.id))}>
                ✕
            </button>
            </div>
        ))}
        </div>

        <div className="sort-bar">
            <span>Sort by:</span>
            <button 
                className={`sort-link ${sortOrder === 'asc' ? 'active' : ''}`} 
                onClick={() => dispatch(setSortOrder('asc'))}
            >
                Ascending price
            </button>
            <button 
                className={`sort-link ${sortOrder === 'desc' ? 'active' : ''}`} 
                onClick={() => dispatch(setSortOrder('desc'))}
            >
                Descending price
            </button>
        </div>
    </div>
  );
}