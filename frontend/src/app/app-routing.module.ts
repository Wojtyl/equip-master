import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './core/auth/user.guard';
import { LoginGuard } from "./core/auth/login.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('src/app/modules/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: '',
    loadChildren: () => import('src/app/modules/core/core.module').then(m => m.CoreModule),
    canActivate: [UserGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
