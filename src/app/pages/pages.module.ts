import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* MODULE ROUTING */
import { PagesRoutingModule } from './pages-routing.module';

/* COMPONENTS PAGES */
import { SharedModule } from '../shared/shared.module';
import { PagesComponent  } from "./pages.component";
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

/* COMPONENTS MODULE PRODUCT */
import { ProductListComponent } from './product/product-list/product-list.component';
import { FormComponent } from './product/form/form.component';

const pagesComponents = [
  PagesComponent,
  HomeComponent,
  ProfileComponent,
  ProductListComponent,
  FormComponent,
]

@NgModule({
  declarations: [
    pagesComponents
  ],
  exports: [
    pagesComponents
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
  ]
})
export class PagesModule { }
