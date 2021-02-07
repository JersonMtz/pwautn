import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* COMPONENTS MODULE */
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

import { SaleListComponent } from './sales/sale-list/sale-list.component';
import { SaleNewComponent } from './sales/sale-new/sale-new.component';

import { PurchaseListComponent } from './purchases/purchase-list/purchase-list.component';
import { PurchaseNewComponent } from './purchases/purchase-new/purchase-new.component';

import { ClientFormComponent } from './clients/client-form/client-form.component';
import { ClientListComponent } from './clients/client-list/client-list.component';

import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';

import { WarehouseListComponent } from './warehouse/warehouse-list/warehouse-list.component';
import { WarehouseFormComponent } from './warehouse/warehouse-form/warehouse-form.component';

import { ProviderListComponent } from './providers/provider-list/provider-list.component';
import { ProviderFormComponent } from './providers/provider-form/provider-form.component';

import { TaxListComponent } from './taxes/tax-list/tax-list.component';
import { TaxFormComponent } from './taxes/tax-form/tax-form.component';

const childreRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    /* PURCHASE VIEW */
    { path: 'purchases', component: PurchaseListComponent },
    { path: 'purchase/new', component: PurchaseNewComponent },
    /* CLIENTS VIEW */
    { path: 'clients', component: ClientListComponent},
    { path: 'client/new', component: ClientFormComponent },
    { path: 'client/edit', component: ClientFormComponent },
    /* PRODUCTS VIEW */
    { path: 'products', component: ProductListComponent },
    { path: 'product/edit', component: ProductFormComponent },
    { path: 'product/add', component: ProductFormComponent },
    /* SALES VIEW */
    { path: 'sales', component: SaleListComponent },
    { path: 'sale/new', component: SaleNewComponent },
    /* USERS VIEW */
    { path: 'users', component: UserListComponent },
    { path: 'user/add', component: UserFormComponent },
    { path: 'user/edit', component: UserFormComponent },
    /* WAREHOUSES VIEW */
    { path: 'warehouses', component: WarehouseListComponent },
    { path: 'warehouse/add', component: WarehouseFormComponent },
    { path: 'warehouse/edit', component: WarehouseFormComponent },
    /* PROVIDERS VIEW */
    { path: 'providers', component: ProviderListComponent },
    { path: 'provider/add', component: ProviderFormComponent },
    { path: 'provider/edit', component: ProviderFormComponent },
    /* TAXES VIEW */
    { path: 'taxes', component: TaxListComponent },
    { path: 'tax/add', component: TaxFormComponent },
    { path: 'tax/edit', component: TaxFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(childreRoutes)],
    exports: [RouterModule]
})
export class RoutingChildrenModule { }
