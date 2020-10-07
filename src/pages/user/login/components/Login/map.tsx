export default {
  UserName: {
    props: {
      size: 'large',
      id: 'userName',
      placeholder: 'admin | user',
    },
    // rules: (formatMessage: any) => [
    //   {
    //     required: true,
    //     message: formatMessage({ id: 'userAndLogin.login.username.required' }),
    //   },
    // ],
    rules: [
      {
        required: true,
        message: '请输入用户名',
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
    // rules: (formatMessage: any) => [
    //   {
    //     required: true,
    //     message: formatMessage({ id: 'userAndLogin.login.password.required' }),
    //   },
    // ],
    rules: [
      {
        required: true,
        message: '请输入密码',
      },
    ],
  },
};
