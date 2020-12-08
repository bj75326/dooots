import request from '@/utils/request';
import { AddNewDeckParams } from './components/NewDeck';
import {
  ToggleStickParams,
  RemoveDeckParams,
} from './components/DeckThumbnail';
import { stringify } from 'qs';

export async function addNewDeck(params: AddNewDeckParams) {
  return request('/api/addNewDeck', {
    method: 'POST',
    data: params,
  });
}

export async function getDecks(params: {
  status: string;
  page: number;
  search: string;
}) {
  console.log('status: ', params.status);
  console.log('page: ', params.page);
  console.log('search: ', params.search);
  return request(`/api/decks?${stringify(params)}`);
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
