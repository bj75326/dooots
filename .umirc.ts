import { defineConfig } from 'umi';

export default defineConfig({
  dva: {
    hmr: true,
  },

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
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/anki',
              name: 'anki',
              component: '/anki',
              routes: [
                {
                  name: 'collections',
                  path: '/anki/collections',
                  component: './anki/collections',
                  exact: true,
                },
                {
                  name: 'collection',
                  path: '/anki/:collection',
                  component: './anki/collection',
                  exact: true,
                },
                {
                  name: 'card',
                  path: '/anki/:collection/:card',
                  component: './anki',
                  exact: true,
                },
                {
                  path: '/anki',
                  redirect: '/anki/collections',
                },
                {
                  component: '404',
                },
              ],
            },
            {
              path: '/standby',
              name: 'standby',
            },
            {
              path: '/',
              redirect: '/anki/collections',
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
});
