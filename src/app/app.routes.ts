import { Routes } from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {ProfileComponent} from './views/profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
];
