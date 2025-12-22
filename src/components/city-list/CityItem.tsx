import React, { memo, useCallback } from 'react';

interface CityItemProps {
  city: string;
  isActive: boolean;
  onClick: (city: string) => void;
}

const CityItem: React.FC<CityItemProps> = memo(({ city, isActive, onClick }) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onClick(city);
  }, [city, onClick]);

  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
        href="#"
        onClick={handleClick}
      >
        <span>{city}</span>
      </a>
    </li>
  );
});

CityItem.displayName = 'CityItem';

export default CityItem;
