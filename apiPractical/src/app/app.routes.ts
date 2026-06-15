import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path:'login',
    loadComponent:() =>
    import ('./login/login').then(m =>m.Login)
  },

  {
    path:'dashboard',
    canActivate:[authGuard],
    loadComponent:()=>
      import('./pages/dashboard/dashboard').then(m =>m.Dashboard)
  },


    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'register',
    loadComponent:()=>
    import('./register/register').then(m=>m.Register)
  }

];
