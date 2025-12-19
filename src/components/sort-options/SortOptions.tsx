import React, { useState } from 'react';

import { SORT_OPTIONS, SortOption } from './constants';

type SortOptionsProps = {
  activeSortOption: SortOption;
  onChange: (sortOption: SortOption) => void;
};

const SortOptions: React.FC<SortOptionsProps> = ({ activeSortOption, onChange }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsSortOpen(!isSortOpen)}
      >
        {activeSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTIONS.map((option) => (
          <li
            key={option}
            className={`places__option ${option === activeSortOption ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => {
              onChange(option);
              setIsSortOpen(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortOptions;
