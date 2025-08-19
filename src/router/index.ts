import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
// import TesteView from '../views/TesteView.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
    },
    // {
    //   path: '/testeo',
    //   name: 'test',
    //   component: TesteView,
    // },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
    },
  ]

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes 
})


router.beforeEach((to, from, next) => {
  // Verificar si la ruta solicitada existe en las rutas definidas
  const exists = routes.some(route => route.path === to.path);
  if (!exists) {
    // Si la ruta no existe, redirigir al menú principal
    // next(`/login`);
    next(`/dashboard`);

    // next(`/smartlink/test`);

    // next(`/principalPage`);
  } else {
    // Si la ruta existe, continuar con la navegación normalmente
    next();
  }
});

export default router
