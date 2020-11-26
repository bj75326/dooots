import { Request, Response } from 'express';

export default {
  'POST /api/addNewDeck': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        status: 'ok',
        deckId: '000000001286',
        deckName: req.body.deckName,
      });
    }, 3000);
  },

  'GET /api/decks': (req: Request, res: Response) => {
    setTimeout(() => {
      res.json([
        {
          // deckId: '000000001191',
          // deckName: 'string';
          // description?: string;
          // tags?: string[];
          // timePointList?: number[];
          // numberOfCards: number;
          // numberOfOverdue: number;
          // numberOfToday: number;
          // status: 'Overdue' | 'Today' | 'Underway';
        },
      ]);
    }, 3000);
  },
};
