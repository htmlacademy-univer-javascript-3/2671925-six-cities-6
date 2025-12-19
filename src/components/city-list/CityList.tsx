import React from 'react';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

interface CityListProps {
  activeCity: string;
  onCityChange: (city: string) => void;
}

const CityList: React.FC<CityListProps> = ({ activeCity, onCityChange }) => (
  <ul className="locations__list tabs__list">
    {CITIES.map((city) => (
      <li key={city} className="locations__item">
        <a
          className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onCityChange(city);
          }}
        >
          <span>{city}</span>
        </a>
      </li>
    ))}
  </ul>
);

export default CityList;
