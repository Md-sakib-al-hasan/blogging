import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { AuthRouters } from '../modules/Auth/auth.route';
import { AdminRouters } from '../modules/Admin/admin.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
