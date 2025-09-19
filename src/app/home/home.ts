import { Component } from '@angular/core';
import { SideNavbar } from '../side-navbar/side-navbar';
import { Header } from '../header/header';

import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'app-home',
  imports: [SideNavbar,Header,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
