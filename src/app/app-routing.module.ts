import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./components/home/home.module`).then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import(`./components/login/login.module`).then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import(`./components/register/register.module`).then(m => m.RegisterModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import(`./components/dashboard/dashboard.module`).then(m => m.DashboardModule)
  },
  {
    path: 'orders',
    loadChildren: () => import(`./components/orders/orders.module`).then(m => m.OrdersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
