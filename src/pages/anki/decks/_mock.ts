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
};
