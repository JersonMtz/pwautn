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
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

import { SaleListComponent } from './sales/sale-list/sale-list.component';
import { SaleNewComponent } from './sales/sale-new/sale-new.component';

import { PurchaseListComponent } from './purchases/purchase-list/purchase-list.component';
import { PurchaseNewComponent } from './purchases/purchase-new/purchase-new.component';

import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientFormComponent } from './clients/client-form/client-form.component';

import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';

import { TaxListComponent } from './taxes/tax-list/tax-list.component';
import { TaxFormComponent } from './taxes/tax-form/tax-form.component';

import { ProviderListComponent } from './providers/provider-list/provider-list.component';
import { ProviderFormComponent } from './providers/provider-form/provider-form.component';

import { WarehouseFormComponent } from './warehouse/warehouse-form/warehouse-form.component';
import { WarehouseListComponent } from './warehouse/warehouse-list/warehouse-list.component';

const pagesComponents = [
  PagesComponent,
  HomeComponent,
  ProfileComponent,
  ProductListComponent,
  ProductFormComponent,
  SaleListComponent,
  SaleNewComponent,
  PurchaseListComponent,
  PurchaseNewComponent,
  ClientListComponent,
  ClientFormComponent,
  UserListComponent,
  UserFormComponent,
  TaxListComponent,
  TaxFormComponent,
  ProviderListComponent,
  ProviderFormComponent,
  WarehouseFormComponent,
  WarehouseListComponent
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
