import request from '@/utils/request';
import { AddNewDeckParams } from './components/NewDeck';
import { ToggleStickParams } from './components/DeckThumbnail';

export async function addNewDeck(params: AddNewDeckParams) {
  return request('/api/addNewDeck', {
    method: 'POST',
    data: params,
  });
}

export async function getDecks() {
  return request('/api/decks');
}

export async function toggleStick(params: ToggleStickParams) {
  return request('api/toggleStick', {
    method: 'POST',
    data: params,
  });
}
