export default {
  UserName: {
    props: {
      size: 'large',
      id: 'userName',
      placeholder: 'admin',
    },
    rules: (formatMessage: any) => [
      {
        required: true,
        message: formatMessage({ id: 'userAndLogin.login.username.required' }),
      },
    ],
  },
  Password: {
    props: {
      size: 'large',
      id: 'password',
      type: 'password',
      placeholder: '888888',
    },
    rules: (formatMessage: any) => [
      {
        required: true,
        message: formatMessage({ id: 'userAndLogin.login.password.required' }),
      },
    ],
  },
};
