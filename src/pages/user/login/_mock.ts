import { Request, Response } from 'express';

export default {
  'POST /api/login/account': (req: Request, res: Response) => {
    const { password, userName } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: 'ok',
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '888888' && userName === 'user') {
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
