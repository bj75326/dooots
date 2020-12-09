import request from '@/utils/request';
import { stringify } from 'qs';

export async function getDeck(params: { deckId: string }) {
  return request(`/api/deck?${stringify(params)}`);
}

export async function getCards(params: {}) {
  return request(`/api/cards?${stringify(params)}`);
}
