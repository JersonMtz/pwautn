import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* COMPONENTS SHARED */
import { BreadcrumbComponent  } from "./breadcrumb/breadcrumb.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { BillCheckComponent } from './bill-check/bill-check.component';
import { StockComponent } from './stock/stock.component';

const sharedComponents = [
  BreadcrumbComponent,
  SidebarComponent,
  NavbarComponent,
  FooterComponent,
  BillCheckComponent,
  StockComponent,
];

@NgModule({
  declarations: [
    sharedComponents
  ],
  exports: [
    sharedComponents
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule { }
