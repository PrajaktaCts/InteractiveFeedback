import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { FeedbackDailog } from '../feedback-dailog/feedback-dailog';

@Component({
  selector: 'app-plan-list',
  imports: [MatIcon],
  templateUrl: './plan-list.html',
  styleUrl: './plan-list.css'
})
export class PlanList {
constructor(private dialog: MatDialog,private cdr: ChangeDetectorRef){}

componentTitle:string='Plan List';
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
