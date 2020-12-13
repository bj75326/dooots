import { Request, Response } from 'express';

const deck = {
  deckId: '000000001191',
  deckName: '经济法2021',
  description: '',
  tags: ['CPA', '2021', '经济法'],
  numberOfCards: 114,
  numberOfOverdue: 8,
  numberOfToday: 11,
  numberOfUnactivated: 51,
  status: 'today',
  createTimestamp: 1606752082770,
  stick: true,
  stickTimestamp: 1606752072773,
};

const cards = [
  {
    cardId: '000000000234',
    deckId: '000000001191',
    cardName: '公司债券与公司股票的区别',
    tags: ['经济法', '第二章', '第一节', '重要'],
    status: 'underway',
    createTimestamp: 1606752082770,
    updateTimestamp: 1606752082770,
    stick: true,
    stickTimestamp: 1609752082770,
    author: 'bier',
    rates: [
      {
        cardId: '000000000234',
        rateTimestamp: 1606752082770,
        rate: 4.5,
      },
      {
        cardId: '000000000234',
        rateTimestamp: 1606757082770,
        rate: 4,
      },
      {
        cardId: '000000000234',
        rateTimestamp: 1606852082770,
        rate: 4.5,
      },
    ],
  },
  {
    cardId: '000000017621',
    deckId: '000000001191',
    cardName: '股东的权力和义务',
    tags: ['经济法', '第二章', '第四节', '重要'],
    status: 'today',
    createTimestamp: 1606752092770,
    updateTimestamp: 1706752092770,
    stick: true,
    stickTimestamp: 1609752086372,
    author: 'bier',
    rates: [
      {
        cardId: '000000017621',
        rateTimestamp: 1606752092770,
        rate: 4.5,
      },
      {
        cardId: '000000017621',
        rateTimestamp: 1606752192770,
        rate: 5,
      },
      {
        cardId: '000000017621',
        rateTimestamp: 1606792192770,
        rate: 4.5,
      },
    ],
  },
  {
    cardId: '000000074343',
    deckId: '000000001191',
    cardName: '破产法概述',
    tags: ['经济法', '第三章', '第一节', '重要'],
    status: 'underway',
    createTimestamp: 1604752082770,
    updateTimestamp: 1604752082770,
    stick: false,
    stickTimestamp: undefined,
    author: 'bier',
    rates: [
      {
        cardId: '000000074343',
        rateTimestamp: 1604752082770,
        rate: 4.5,
      },
      {
        cardId: '000000074343',
        rateTimestamp: 1605152082880,
        rate: 4,
      },
      {
        cardId: '000000074343',
        rateTimestamp: 1609952082880,
        rate: 2,
      },
    ],
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

export default {
  'GET /api/deck': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        status: 'ok',
        deck,
        cards,
        eof: true,
      });
    }, 1000);
  },

  'GET /api/deck/tags': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send();
    }, 1000);
  },
};
