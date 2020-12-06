import request from '@/utils/request';
import { AddNewDeckParams } from './components/NewDeck';
import {
  ToggleStickParams,
  RemoveDeckParams,
} from './components/DeckThumbnail';

import { Deck } from './model';

export async function addNewDeck(params: AddNewDeckParams) {
  return request('/api/addNewDeck', {
    method: 'POST',
    data: params,
  });
}

export async function getDecks(params: { status: string; page: number }) {
  console.log('status: ', params.status);
  console.log('page: ', params.page);
  return request(`/api/decks?status=${params.status}&page=${params.page}`);
}

export async function toggleStick(params: ToggleStickParams) {
  return request('/api/toggleStick', {
    method: 'POST',
    data: params,
  });
}

export async function removeDeck(params: RemoveDeckParams) {
  return request('/api/removeDeck', {
    method: 'POST',
    data: params,
  });
}
