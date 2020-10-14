import { Request, Response } from 'express';

export default {
  'POST /api/register': {
    status: 'ok',
    currentAuthority: 'guest',
    //error
    //status: 'error',
    //currentAuthority: 'guest',
    //message: '',
    //description: '',
  },

  'POST /api/register/unique': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        username: 'test',
        existed: false,
      });
    }, 3000);
  },
};
