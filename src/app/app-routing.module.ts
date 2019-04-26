import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {InventoryComponent} from './inventory/inventory.component';
import {ScanComponent} from './scan/scan.component';
import {ProductComponent} from './product/product.component';
import {FieldComponent} from './field/field.component';
import {AuditComponent} from './audit/audit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'scan', component: ScanComponent},
  {path: 'product/:sku', component: ProductComponent},
  {path: 'field', component: FieldComponent},
  {path: 'audit', component: AuditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
