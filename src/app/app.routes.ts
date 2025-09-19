import { Routes } from '@angular/router';
import { Feedback } from './feedback/feedback';
import { SideNavbar } from './side-navbar/side-navbar';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Home } from './home/home';
import { Order } from './order/order';
import { Dashboard } from './dashboard/dashboard';
import { StarPiechart } from './star-piechart/star-piechart';
import { HeaderFeedback } from './header-feedback/header-feedback';

export const routes: Routes = [
    {path: 'feedback', component: Feedback, title: 'feedback'},
    {path: 'sidenav', component: SideNavbar, title: 'sidenav'},
    {path: 'header', component: Header, title: 'header'},
    {path: 'footer', component: Footer, title: 'footer'},
    {path: 'home', component: Home, title: 'home'},
    {path: 'order', component: Order, title: 'order'},
    {path: 'header-feedback/:component', component: HeaderFeedback, title: 'header-feedback'},
    {path: 'dashboard', component: Dashboard, title: 'dashboard'},
    {path: 'star-piechart', component: StarPiechart, title: 'star-piechart'},
    {path: '**', redirectTo: 'home',pathMatch: 'full'},
];
