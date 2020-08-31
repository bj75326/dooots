import { Request, Response } from 'express';

const getNotices = (req: Request, res: Response) => {
  res.json([
    {
      id: '000000001',
      title: '记忆节点',
      description: '今日有记忆卡片到达记忆节点',
      extra: '未开始',
      status: 'todo',
      type: 'event',
    },
    {
      id: '000000002',
      title: '记忆节点',
      description: '记忆卡片到达记忆节点未重新复习，已经逾期',
      extra: '已逾期 2 天',
      status: 'urgent',
      type: 'event',
    },
    {
      id: '000000003',
      title: '记忆节点',
      description: '记忆卡片到达记忆节点未重新复习，已经逾期',
      extra: '已逾期 7 天',
      status: 'urgent',
      type: 'event',
    },
    {
      id: '000000004',
      title: '系统消息',
      description: '周报已经更新',
      datetime: '2020-08-31',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000005',
      title: '系统消息',
      description: '月报已经生成',
      datetime: '2020-08-31',
      type: 'message',
      clickClose: true,
    },
  ]);
};

export default getNotices;
