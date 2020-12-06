import { Request, Response } from 'express';

const decks = [
  {
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
  },
  {
    deckId: '000000004327',
    deckName: '线性代数李永乐真题2020',
    description: '',
    tags: ['线性代数', '考研', '数学', '李永乐'],
    numberOfCards: 66,
    numberOfOverdue: 0,
    numberOfToday: 0,
    numberOfUnactivated: 19,
    status: 'underway',
    createTimestamp: 1606752072770,
    stick: true,
    stickTimestamp: 1605752072773,
  },
  {
    deckId: '000000007476',
    deckName: '应用法学考点',
    description: '暂时按照XX学姐的指点整理的考点，后续请教YY学长再添加',
    tags: ['司法考试', '考试重点', '2021'],
    numberOfCards: 78,
    numberOfOverdue: 0,
    numberOfToday: 0,
    numberOfUnactivated: 78,
    status: 'unactivated',
    createTimestamp: 1606752072773,
    stick: false,
    stickTimestamp: undefined,
  },
  {
    deckId: '000000008732',
    deckName: '托福词汇',
    description: '新东方教材托福2021',
    tags: ['托福', '英语', '2021'],
    numberOfCards: 149,
    numberOfOverdue: 0,
    numberOfToday: 19,
    numberOfUnactivated: 8,
    status: 'today',
    createTimestamp: 1605752072773,
    stick: false,
    stickTimestamp: undefined,
  },
  {
    deckId: '000000006666',
    deckName: '病理生理学2-1',
    description: 'XX老师整理，期末考试启用',
    tags: ['病理', '生理', '2021', '期末'],
    numberOfCards: 61,
    numberOfOverdue: 19,
    numberOfToday: 0,
    numberOfUnactivated: 0,
    status: 'overdue',
    createTimestamp: 1604752072773,
    stick: false,
    stickTimestamp: undefined,
  },
  {
    deckId: '000000009999',
    deckName: '申论',
    description: '官方考试要求变动做及时调整，待定',
    tags: ['公务员', '2021'],
    numberOfCards: 199,
    numberOfOverdue: 10,
    numberOfToday: 9,
    numberOfUnactivated: 6,
    status: 'today',
    createTimestamp: 1603752072773,
    stick: false,
    stickTimestamp: undefined,
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
  {
    status: 'today',
  },
];

export default {
  'POST /api/addNewDeck': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        status: 'error',
        deckId: '000000001286',
        deckName: req.body.deckName,
      });
    }, 3000);
  },

  'GET /api/decks': (req: Request, res: Response) => {
    let resDecks = decks;
    const { status = '', page = 0 } = req.query;
    switch (status) {
      case 'today':
        resDecks = [...decks.filter(deck => deck.status === 'today')].splice(
          0,
          +page * 15,
        );
        break;
      case 'overdue':
        resDecks = [...decks.filter(deck => deck.numberOfOverdue > 0)].splice(
          0,
          +page * 15,
        );
        break;
      case 'unactivated':
        resDecks = [
          ...decks.filter(deck => deck.status === 'unactivated'),
        ].splice(0, +page * 15);
        break;
      default:
        resDecks = [...decks].splice(0, +page * 15);
        break;
    }
    setTimeout(() => {
      res.send({
        status: 'ok',
        decks: resDecks,
        //eof: ,
      });
    }, 1000);
  },

  'POST /api/toggleStick': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        status: 'ok',
        deckId: req.body.deckId,
        stick: req.body.stick,
        stickTimestamp: req.body.stickTimestamp,
      });
    }, 500);
  },

  'POST /api/removeDeck': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        status: 'ok',
        deckId: req.body.deckId,
      });
    }, 2000);
  },
};
