import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login', loadComponent: () => import('./components/login/login.component')
    },
    {
        path: 'books', loadComponent: () => import('./components/book/book.component')
    },
    {
        path: 'user', loadComponent: () => import('./components/user/user.component')
    },
    {
        path: 'recoverPassword', loadComponent: () => import('./components/recover-password/recover-password.component')
    },
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    }
];
