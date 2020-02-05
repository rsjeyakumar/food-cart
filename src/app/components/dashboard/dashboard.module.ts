import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { MenusComponent } from './menus/menus.component';


@NgModule({
  declarations: [DashboardComponent, MenusComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    PrimengModule
  ]
})
export class DashboardModule { }
