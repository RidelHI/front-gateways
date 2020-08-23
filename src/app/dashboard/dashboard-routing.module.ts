import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'gateways', loadChildren: () => import('../gateways/gateways.module').then(m => m.GatewaysModule) },
      { path: 'devices', loadChildren: () => import('../devices/devices.module').then(m => m.DevicesModule) },
      { path: 'devices/:id', loadChildren: () => import('../devices/devices.module').then(m => m.DevicesModule) },
      {
        path: '',
        redirectTo: 'gateways',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
