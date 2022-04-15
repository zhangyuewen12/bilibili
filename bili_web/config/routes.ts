export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/GenderAnalysis',
    name: 'Gender Analysis',
    icon: 'smile',
    component: './analysis/GenderAnalysis',
  },
  {
    path: '/SchoolAnalaysis',
    name: 'School Analysis',
    icon: 'smile',
    component: './analysis/SchoolAnalysis',
  },
  {
    path: '/VipAnalaysis',
    name: 'Vip Analysis',
    icon: 'smile',
    component: './analysis/VipAnalysis',
  },
  {
    path: '/LevelAnalysis',
    name: 'Level Analysis',
    icon: 'smile',
    component: './analysis/LevelAnalysis',
  },
  {
    path: '/FansAnalysis',
    name: 'Fans Analysis',
    icon: 'smile',
    component: './analysis/FansAnalysis',
  },
  {
    path: '/FollowingAnalysis',
    name: 'Following Analysis',
    icon: 'smile',
    component: './analysis/FollowingAnalysis',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
