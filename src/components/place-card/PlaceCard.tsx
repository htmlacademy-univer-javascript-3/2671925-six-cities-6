import React from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types';

type PlaceCardVariant = 'cities' | 'favorites' | 'near-places';

interface PlaceCardProps {
  offer: Offer;
  variant?: PlaceCardVariant;
  onMouseEnter?: (offerId: string) => void;
  onMouseLeave?: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  offer,
  variant = 'cities',
  onMouseEnter,
  onMouseLeave,
}) => {
  const { id, title, type, price, rating, previewImage, isPremium, isFavorite } = offer;

  const imageSize = variant === 'favorites'
    ? { width: 150, height: 110 }
    : { width: 260, height: 200 };

  const cardClass = variant === 'favorites'
    ? 'favorites__card place-card'
    : variant === 'near-places'
      ? 'near-places__card place-card'
      : 'cities__card place-card';

  const imageWrapperClass = variant === 'favorites'
    ? 'favorites__image-wrapper place-card__image-wrapper'
    : variant === 'near-places'
      ? 'near-places__image-wrapper place-card__image-wrapper'
      : 'cities__image-wrapper place-card__image-wrapper';

  const infoClass = variant === 'favorites'
    ? 'favorites__card-info place-card__info'
    : 'place-card__info';

  const handleMouseEnter = () => {
    onMouseEnter?.(id);
  };

  const handleMouseLeave = () => {
    onMouseLeave?.();
  };

  return (
    <article
      className={cardClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={imageSize.width} height={imageSize.height} alt="Place image" />
        </Link>
      </div>
      <div className={infoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
