import { Routes } from '@angular/router';
import { HomePage } from './pages/public/home/home.page';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', loadComponent: () => import('./pages/public/auth/login/login').then(m => m.Login) },
  // {
  //   path: 'dashboard',
  //   loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
  //   canActivate: [AuthGuard, RoleGuard],
  //   data: {
  //     expectedRoles: ['admin', 'revendedor']
  //   }
  // }
];
