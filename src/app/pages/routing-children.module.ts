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

import { ClientListComponent } from './clients/client-list/client-list.component';

import { UserListComponent } from './users/user-list/user-list.component';

import { WarehouseListComponent } from './warehouses/warehouse-list/warehouse-list.component';

import { ProviderListComponent } from './providers/provider-list/provider-list.component';

import { TaxListComponent } from './taxes/tax-list/tax-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { CategoryListComponent } from './category/category-list/category-list.component';

const childreRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    /* CLIENTS VIEW */
    { path: 'clients', component: ClientListComponent},
    /* CATEGORY VIEW */
    { path: 'categories', component: CategoryListComponent },
    /* PURCHASE VIEW */
    { path: 'purchases', component: PurchaseListComponent },
    { path: 'purchases/new', component: PurchaseNewComponent },
    /* PRODUCTS VIEW */
    { path: 'products', component: ProductListComponent },
    { path: 'products/edit', component: ProductFormComponent },
    { path: 'products/add', component: ProductFormComponent },
    /* SALES VIEW */
    { path: 'sales', component: SaleListComponent },
    { path: 'sales/new', component: SaleNewComponent },
    /* USERS VIEW */
    { path: 'users', component: UserListComponent },
    { path: 'users/edit', component: UserFormComponent },
    { path: 'users/add', component: UserFormComponent },
    /* PROVIDERS VIEW */
    { path: 'providers', component: ProviderListComponent },
    /* TAXES VIEW */
    { path: 'taxes', component: TaxListComponent },
    /* WAREHOUSES VIEW */
    { path: 'warehouses', component: WarehouseListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(childreRoutes)],
    exports: [RouterModule]
})
export class RoutingChildrenModule { }
