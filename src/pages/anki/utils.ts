import { Deck } from './decks/model';

export const getDeckStatusColor = (status: Deck['status']) => {
  switch (status) {
    case 'overdue':
      return '#F5222D';
    case 'today':
      return '#FFAD1F';
    case 'unactivated':
      return '#A8A8A8';
    case 'underway':
      return '#17BF63';
    default:
      return '#17BF63';
  }
};
