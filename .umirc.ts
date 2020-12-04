import { defineConfig } from 'umi';
import path from 'path';

export default defineConfig({
  alias: {
    '*': path.join(__dirname, ''),
  },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  request: {
    dataField: '',
  },
  // theme 配置里的变量并不会在theme.config.json里的其他主题上生效！
  theme: {
    '@border-radius-base': '4px',
  },
  ignoreMomentLocale: true,
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          wrappers: ['./Authorized'],
          routes: [
            {
              path: '/anki',
              name: 'anki',
              component: './anki',
              hideChildrenInMenu: true,
              hideInBreadcrumb: true,
              authority: ['admin', 'user'],
              routes: [
                {
                  name: 'decks',
                  path: '/anki/decks',
                  component: './anki/decks',
                  routes: [
                    {
                      path: '/anki/decks',
                      redirect: '/anki/decks/all',
                    },
                    {
                      name: 'all',
                      path: '/anki/decks/all',
                      component: './anki/decks/all',
                    },
                    {
                      name: 'today',
                      path: '/anki/decks/today',
                      component: './anki/decks/today',
                    },
                    {
                      name: 'overdue',
                      path: '/anki/decks/overdue',
                      component: './anki/decks/overdue',
                    },
                    {
                      name: 'unactivated',
                      path: '/anki/decks/unactivated',
                      component: './anki/decks/unactivated',
                    },
                  ],
                },
                {
                  name: 'deck',
                  path: '/anki/:deck',
                  component: './anki/deck',
                  exact: true,
                },
                {
                  name: 'card',
                  path: '/anki/:deck/:card',
                  component: './anki/card',
                  exact: true,
                },
                {
                  path: '/anki',
                  redirect: '/anki/decks',
                },
                // getAuthorityFromRouter 等函数在筛选route的时候会默认传递 path='/', 这样会导致 '/anki' 路由路径下有父级路径，所以这里不能添加404路由
                // {
                //   component: '404',
                // },
              ],
            },
            {
              path: '/standby',
              name: 'standby',
              authority: ['admin', 'user'],
            },
            {
              path: '/',
              redirect: '/anki/decks',
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  manifest: {
    basePath: '/',
  },
  title: false,
});
