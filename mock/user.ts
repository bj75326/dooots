import { Request, Response } from 'express';

export default {
  'GET /api/currentUser': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        avatar:
          'https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/0d56cb996999dd8dd0fa6974a0d962148d41efb2.jpg',
        name: '比尔',
        title: '前端萌新',
        group: 'user',
        signature: '求包养，么么哒',
        userid: '0000000000001',
      });
    }, 2000);
  },
};
