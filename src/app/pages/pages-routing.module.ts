import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* COMPONENTS MODULE */
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    loadChildren: () => import("./routing-children.module").then(m => m.RoutingChildrenModule )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
