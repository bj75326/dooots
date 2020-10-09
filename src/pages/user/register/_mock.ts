export default {
  'POST /api/register': {
    status: 'ok',
    currentAuthority: 'user',
  },

  'POST /api/register/unique': {
    username: 'test',
    existed: true,
  },
};
