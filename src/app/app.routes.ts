import { Routes } from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {ProfileComponent} from './views/profile/profile.component';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', component: PageNotFoundComponent },
];
