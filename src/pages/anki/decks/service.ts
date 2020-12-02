import request from '@/utils/request';
import { AddNewDeckParams } from './components/NewDeck';

export async function addNewDeck(params: AddNewDeckParams) {
  return request('/api/addNewDeck', {
    method: 'POST',
    data: params,
  });
}

export async function getDecks() {
  return request('/api/decks');
}

export async function toggleStick() {
  return request('api/toggleStick');
}
