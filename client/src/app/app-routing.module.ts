import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CasedetailsComponent } from './casedetails/casedetails.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';  
import {ContactsComponent} from './contacts/contacts.component';

const routes: Routes = [  
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuard] },
  { path: 'casedetail/:index', component: CasedetailsComponent },
  { path: 'contactus', component: ContactsComponent }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
