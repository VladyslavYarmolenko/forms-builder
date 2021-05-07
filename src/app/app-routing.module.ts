import { FormBuilderGuard } from './guard-route/form-builder.guard';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'form-builder', component: FormBuilderComponent,  canActivate: [FormBuilderGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


