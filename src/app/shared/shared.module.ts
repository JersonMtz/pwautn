import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/* COMPONENTS SHARED */
import { BreadcrumbComponent  } from "./breadcrumb/breadcrumb.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NotImageDirective } from './directive/notImage.directive';

const sharedComponents = [
  BreadcrumbComponent,
  SidebarComponent,
  NavbarComponent,
  FooterComponent,
  SpinnerComponent
];

@NgModule({
  declarations: [
    sharedComponents,
    NotImageDirective
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
