import { Request, Response } from 'express';

export default {
  // 'GET /api/authority': {
  //   authority: 'user',
  // },
  'GET /api/authority': {
    authority: 'guest',
  },
  // 'GET /api/authority': {
  //   authority: 'admin',
  // },
  // 'GET /api/authority': {
  //   authority: ['user', 'admin'],
  // },

  'POST /api/login/account': (req: Request, res: Response) => {
    const { userName, password } = req.body;
    if (userName === 'admin' && password === '888888') {
      res.send({
        status: 'ok',
        currentAuthority: 'admin',
      });
      return;
    }
    if (userName === 'user' && password === '888888') {
      res.send({
        status: 'ok',
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      currentAuthority: 'guest',
    });
  },
};
