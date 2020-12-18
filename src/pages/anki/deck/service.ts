import request from '@/utils/request';
import { stringify } from 'qs';

export async function getDeck(params: { deckId: string }) {
  return request(`/api/deck?${stringify(params)}`);
}

export async function getCards(params: {}) {
  return request(`/api/deck/cards?${stringify(params)}`);
}

export async function getTags(params: { deckId: string }) {
  return request(`/api/deck/tags?${stringify(params)}`);
}

export async function initCards(params: {
  cards: { deckId: string; cardId: string }[];
}) {
  return request('/api/deck/reset', {
    method: 'POST',
    data: params,
  });
}

export async function removeCards(params: {
  cards: { deckId: string; cardId: string }[];
}) {
  return request('/api/deck/delete', {
    method: 'POST',
    data: params,
  });
}
