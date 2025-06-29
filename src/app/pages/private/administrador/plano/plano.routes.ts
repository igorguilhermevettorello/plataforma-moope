import { Routes } from '@angular/router';

export const planoRoutes: Routes = [
  {
    path: '',
    // component: Lista
    loadComponent: () => import('./lista/lista').then(m => m.Lista)
  },
  {
    path: 'add',
    // component: Formulario
    loadComponent: () => import('./formulario/formulario').then(m => m.Formulario)
  }
];
