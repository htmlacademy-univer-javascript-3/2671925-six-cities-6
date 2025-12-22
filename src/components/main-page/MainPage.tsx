import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCity, selectOffersByCity } from '../../store/selectors';
import { changeCity } from '../../store/action';
import OffersList from '../offers-list';
import Map from '../map';
import CityList from '../city-list';
import SortOptions, { SortOption } from '../sort-options';
import Header from '../header';
import MainEmpty from '../main-empty';

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
  const activeCity = useSelector(selectCity);
  const filteredOffers = useSelector(selectOffersByCity);

  const [activeSortOption, setActiveSortOption] = useState<SortOption>('Popular');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const sortedOffers = useMemo(() => {
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
  }, [filteredOffers, activeSortOption]);

  const handleCityChange = useCallback((city: string) => {
    dispatch(changeCity(city));
    setActiveOfferId(null);
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index${filteredOffers.length === 0 ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList activeCity={activeCity} onCityChange={handleCityChange} />
          </section>
        </div>
        <div className="cities">
          {filteredOffers.length === 0 ? (
            <MainEmpty city={activeCity} />
          ) : (
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
          )}
        </div>
      </main>
    </div>
  );
};

export default MainPage;
