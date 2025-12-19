import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types';

export const changeCity = createAction<string>('city/change');

export const fillOffers = createAction<Offer[]>('offers/fill');
