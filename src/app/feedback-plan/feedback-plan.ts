import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDailog } from '../feedback-dailog/feedback-dailog';
import { PlanList } from '../plan-list/plan-list';
import { Header } from '../header/header';
import { SideNavbar } from '../side-navbar/side-navbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-feedback-plan',
  imports: [Header,SideNavbar,MatIconModule,PlanList],
  templateUrl: './feedback-plan.html',
  styleUrl: './feedback-plan.css'
})
export class FeedbackPlan {
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
    position: { top: '159px', left: '410px' },
    panelClass: 'custom-dialog-style'
    
  });
}
}
