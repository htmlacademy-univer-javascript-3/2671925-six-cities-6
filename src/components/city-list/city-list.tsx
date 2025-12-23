import React, { memo } from 'react';
import CityItem from './city-item';
import { CITIES } from '../../const';

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
        onCityClick={onCityChange}
      />
    ))}
  </ul>
);

const MemoizedCityList = memo(CityList);
export default MemoizedCityList;
