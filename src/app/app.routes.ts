import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Dashboard1 } from './dashboard1/dashboard1';
import { RegisterComplaint } from './register-complaint/register-complaint';

export const routes: Routes = [

      { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'dashboard1', component: Dashboard1 },
      { path: 'profile', component: Profile },
      {path:'register_complaint',component:RegisterComplaint}
    ]
},
    {path:'profile',component:Profile}
];
