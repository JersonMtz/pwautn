import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/* COMPONENTS SHARED */
import { BreadcrumbComponent  } from "./breadcrumb/breadcrumb.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';


const sharedComponents = [
  BreadcrumbComponent,
  SidebarComponent,
  NavbarComponent,
  FooterComponent
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
