import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDailog } from '../feedback-dailog/feedback-dailog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-order',
  imports: [MatIcon],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order {

  constructor(private dialog: MatDialog,private cdr: ChangeDetectorRef){}

componentTitle:string='Order List';
openInfoDialog() {
  this.dialog.open(FeedbackDailog, {
    // data: text,
    data:{
      title:this.componentTitle
    },
    width: '400px',
    height: '251px !important',
    position: { top: '159px', left: '410px' },
    panelClass: 'custom-dialog-style'
    
  });
}
}
