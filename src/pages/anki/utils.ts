import { Deck } from './decks/model';
import { SettingModelState } from '@/models/settings';

export const getDeckStatusColor = (
  status: Deck['status'],
  theme: SettingModelState['theme'],
) => {
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
