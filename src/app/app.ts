import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Feedback } from './feedback/feedback';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { SideNavbar } from './side-navbar/side-navbar';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'FeedbackSystem';
}
