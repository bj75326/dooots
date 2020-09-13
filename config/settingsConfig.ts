export interface Color {
  name: 'default' | 'star' | 'blossom' | 'octopus' | 'fire' | 'avocado';
  color: '#1890ff' | '#FFAD1F' | '#E0245E' | '#794BC4' | '#F45D22' | '#17BF63';
  icon: string;
}

export interface Theme {
  name: 'Light' | 'Dark';
  value: 'light' | 'dark';
}

export interface Language {
  name: string;
  value: string;
}

export const fontSizeMarks = {
  0: 1,
  25: 2,
  50: 3,
  75: 4,
  100: 5,
};

export const colors = [
  {
    name: 'default',
    color: '#1890ff',
    icon:
      'https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/1cd3da60950d04e0ae07ddd47cc3cf580ee6a762.png',
  },
  {
    name: 'star',
    color: '#FFAD1F',
    icon:
      'https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/3f83b630009683f995b11e04ad3b5b177f7f9860.png',
  },
  {
    name: 'blossom',
    color: '#E0245E',
    icon:
      'https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/fb1ee6ff023f7fb08ca0c342329f5edebc462f61.png',
  },
  {
    name: 'octopus',
    color: '#794BC4',
    icon:
      'https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/1af459766f837712e0d605d7b60293f1c9dd224b.png',
  },
  {
    name: 'fire',
    color: '#F45D22',
    icon:
      'https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/a8acafb586952bab6805c55fd684892930db519d.png',
  },
  {
    name: 'avocado',
    color: '#17BF63',
    icon:
      'https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/16d8565f4c01d0338a2cf9fd563cb069367649ea.png',
  },
];

export const themes = [
  {
    name: 'Light',
    value: 'light',
  },
  {
    name: 'Dark',
    value: 'dark',
  },
];

export const colorWeakAvailable = true;

export const languages = [
  {
    name: '简体中文',
    value: 'zh-CN',
  },
  {
    name: 'English',
    value: 'en-US',
  },
];
