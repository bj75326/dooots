import { Deck } from './decks/model';
import { Card } from './deck/model';
import { useCallback, useEffect, useRef, MutableRefObject } from 'react';
import { Dispatch } from 'umi';

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

export const getCardStatusColor = (status: Card['status']) => {
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

// infinite scrolling with intersection observer
export const useInfiniteScroll = (
  scrollRef: MutableRefObject<any>,
  infiniteScrollLoading: any,
  //startInfiniteScroll: { current: boolean },
  keepEof: { current: boolean },
) => {
  const scrollObserver = useCallback(
    (node: Element) => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0 && !keepEof.current) {
            console.log('run infiniteScrollLoading');
            console.log('en.intersectionRatio: ', en.intersectionRatio);

            infiniteScrollLoading();
          }
        });
      }).observe(node);
    },
    [infiniteScrollLoading],
  );

  useEffect(() => {
    console.log('useEffect for scrolllll');

    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
};
