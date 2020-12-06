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

export async function getDecks(status: Deck['status']) {
  return request(`/api/decks?status=${status}`);
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
