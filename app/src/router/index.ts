import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { supabase } from '@/supabase/init';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    meta: {
      title: 'Home',
      auth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Home,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
          auth: true,
        },
        component: () =>
          import(/* webpackChunkName: 'dashboard'*/ '@/views/Dashboard.vue'),
      },
      {
        path: 'create-todo',
        name: 'CreateTodo',
        meta: {
          title: 'CreateTodo',
          auth: true,
        },
        component: () =>
          import(/* webpackChunkName: 'createTodo'*/ '@/views/CreateTodo.vue'),
      },
      {
        path: 'categories-overview',
        name: 'CategoriesOverview',
        meta: {
          title: 'CategoriesOverview',
          auth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: 'categoriesOverview'*/ '@/views/CategoriesOverview.vue'
          ),
      },
      {
        path: 'create-category',
        name: 'CreateCategory',
        meta: {
          title: 'CreateCategory',
          auth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: 'createCategory'*/ '@/views/CreateCategory.vue'
          ),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      auth: false,
      transition: 'slide-right',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
      auth: false,
      transition: 'slide-left',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to) => {
  document.title = `${to.meta.title} | WeOrgaNice`;
});

// Route guard for auth routes
router.beforeEach((to, _from, next) => {
  const user: any = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: 'Login' });
    return;
  }
  next();
});

export default router;
