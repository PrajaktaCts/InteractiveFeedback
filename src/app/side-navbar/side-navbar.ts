import { Component } from '@angular/core';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDrawerMode, MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule, MatNavList} from '@angular/material/list';
import { FormControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  imports: [MatIconModule,MatToolbarModule,MatSidenavModule,MatSidenav,MatNavList,MatIcon,MatListModule,RouterModule],
  templateUrl: './side-navbar.html',
  styleUrl: './side-navbar.css'
})
export class SideNavbar {
  mode = new FormControl('over' as MatDrawerMode);
  
}
