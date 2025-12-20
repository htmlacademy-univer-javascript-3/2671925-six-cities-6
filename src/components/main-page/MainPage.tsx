import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { changeCity } from '../../store/action';
import OffersList from '../offers-list';
import Map from '../map';
import CityList from '../city-list';
import SortOptions, { SortOption } from '../sort-options';

const CITY_LOCATIONS: Record<string, { name: string; location: { latitude: number; longitude: number; zoom: number } }> = {
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 12,
    },
  },
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12,
    },
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 12,
    },
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 12,
    },
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 12,
    },
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 12,
    },
  },
};

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const activeCity = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);

  const [activeSortOption, setActiveSortOption] = useState<SortOption>('Popular');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);

  const sortedOffers = (() => {
    switch (activeSortOption) {
      case 'Price: low to high':
        return filteredOffers.slice().sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return filteredOffers.slice().sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return filteredOffers.slice().sort((a, b) => b.rating - a.rating);
      case 'Popular':
      default:
        return filteredOffers;
    }
  })();

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
    setActiveOfferId(null);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList activeCity={activeCity} onCityChange={handleCityChange} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>
              <SortOptions activeSortOption={activeSortOption} onChange={setActiveSortOption} />
              <OffersList offers={sortedOffers} onActiveOfferChange={setActiveOfferId} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={sortedOffers} activeOfferId={activeOfferId} city={CITY_LOCATIONS[activeCity]} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
