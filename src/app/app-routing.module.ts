import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app/services/auth-guard.service';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import(`./components/login/login.module`).then(m => m.LoginModule)
  },
  {
    path: '',
    redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import(`./components/admin/admin.module`).then(m => m.AdminModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    loadChildren: () => import(`./components/register/register.module`).then(m => m.RegisterModule)
  },
  {
    path: 'vendors',
    loadChildren: () => import(`./components/dashboard/dashboard.module`).then(m => m.DashboardModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'orders',
    loadChildren: () => import(`./components/orders/orders.module`).then(m => m.OrdersModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
