import { ChangeDetectorRef, Component } from '@angular/core';
import { Home } from '../home/home';
import { Header } from '../header/header';
import { SideNavbar } from '../side-navbar/side-navbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FeedbackDailog } from '../feedback-dailog/feedback-dailog';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '../order/order';

@Component({
  selector: 'app-feedback',
  imports: [Header,SideNavbar,MatIconModule,Order],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css'
})
export class Feedback {
constructor(private dialog: MatDialog,private cdr: ChangeDetectorRef) {}
componentTitle:string='Header';

ngOnInit() {
  this.cdr.detectChanges();
}
openInfoDialog() {
  this.dialog.open(FeedbackDailog, {
    // data: text,
    data:{
      title:this.componentTitle
    },
    width: '400px',
    height: '251px !important',
    position: { top: '109px', left: '410px' }, //top:159px
    panelClass: 'custom-dialog-style'
    
  });
}
}
