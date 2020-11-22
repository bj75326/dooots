import request from 'umi-request';
import { AddNewDeckParams } from './components/NewDeck';

export async function addNewDeck(params: AddNewDeckParams) {
  return request('/api/addNewDeck', {
    method: 'POST',
    data: params,
  });
}
