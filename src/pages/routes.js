const routes = [
  {
    path: '/',
    component: () => import('../layouts/main-layout.vue'),
    children: [
      { path: '', component: () => import('./IndexPage.vue') },
      {
        path: '/drive/:catchAll(.*)*',
        component: () => import('./drive/page-drive.vue'),
        meta: {
          title: 'My Drive'
        }
      },
      {
        path: '/stone',
        component: () => import('./stone/page-stone.vue'),
        meta: {
          title: 'My Stones'
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('./ErrorNotFound.vue')
  }
]

export default routes
