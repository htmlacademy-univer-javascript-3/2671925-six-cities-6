import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 4,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
  },
  {
    id: '2',
    user: {
      name: 'Anna',
      avatarUrl: 'img/avatar-angelina.jpg',
    },
    rating: 5,
    comment: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    date: '2019-05-15',
  },
  {
    id: '3',
    user: {
      name: 'John',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 3,
    comment: 'The location is great, but the apartment could use some updates. The kitchen was a bit small for cooking.',
    date: '2020-01-10',
  },
];
