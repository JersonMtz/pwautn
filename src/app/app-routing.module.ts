import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* COMPONENT MODULE */
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: NotpagefoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }







