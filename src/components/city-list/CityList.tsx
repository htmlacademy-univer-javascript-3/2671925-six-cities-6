import React, { memo } from 'react';
import CityItem from './CityItem';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

interface CityListProps {
  activeCity: string;
  onCityChange: (city: string) => void;
}

const CityList: React.FC<CityListProps> = ({ activeCity, onCityChange }) => (
  <ul className="locations__list tabs__list">
    {CITIES.map((city) => (
      <CityItem
        key={city}
        city={city}
        isActive={city === activeCity}
        onClick={onCityChange}
      />
    ))}
  </ul>
);

const MemoizedCityList = memo(CityList);
export default MemoizedCityList;
