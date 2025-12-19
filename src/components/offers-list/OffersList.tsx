import React from 'react';
import { Offer } from '../../types';
import PlaceCard from '../place-card';

interface OffersListProps {
  offers: Offer[];
  onActiveOfferChange?: (offerId: string | null) => void;
}

const OffersList: React.FC<OffersListProps> = ({ offers, onActiveOfferChange }) => {
  const handleCardMouseEnter = (offerId: string) => {
    onActiveOfferChange?.(offerId);
  };

  const handleCardMouseLeave = () => {
    onActiveOfferChange?.(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant="cities"
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
        />
      ))}
    </div>
  );
};

export default OffersList;
