import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* COMPONENTS MODULE */
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProfileComponent } from './profile/profile.component';
import { FormComponent } from './product/form/form.component';

const childreRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'product', component: ProductListComponent },
    { path: 'product/edit', component: FormComponent },
    { path: 'product/add', component: FormComponent},
];

@NgModule({
    imports: [RouterModule.forChild(childreRoutes)],
    exports: [RouterModule]
})
export class RoutingChildrenModule { }
