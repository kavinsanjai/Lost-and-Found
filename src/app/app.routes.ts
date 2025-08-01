import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Dashboard1 } from './dashboard1/dashboard1';
import { RegisterComplaint } from './register-complaint/register-complaint';
import { UsersComponent } from './users/users';
import { CreateUserComponent } from './create-user/create-user';
import { Complaints } from './complaints/complaints'; 
export const routes: Routes = [

      { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'dashboard1', pathMatch: 'full' },
      { path: 'dashboard1', component: Dashboard1 },
      { path: 'profile', component: Profile },
      {path:'register_complaint',component:RegisterComplaint},
      {path:'users',component:UsersComponent},
      {path:'create-user',component:CreateUserComponent},
      {path:'complaints',component:Complaints}
    ]
},
    {path:'profile',component:Profile},
    {path:'users',component:UsersComponent},
    {path:'create-user',component:CreateUserComponent}
];
