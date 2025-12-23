import React, { memo, useCallback } from 'react';

interface CityItemProps {
  city: string;
  isActive: boolean;
  onCityClick: (city: string) => void;
}

const CityItem: React.FC<CityItemProps> = memo(({ city, isActive, onCityClick }) => {
  const handleCityClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onCityClick(city);
  }, [city, onCityClick]);

  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
        href="#"
        onClick={handleCityClick}
      >
        <span>{city}</span>
      </a>
    </li>
  );
});

CityItem.displayName = 'CityItem';

export default CityItem;
