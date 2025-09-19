import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDailog } from '../feedback-dailog/feedback-dailog';
import { MatIcon } from '@angular/material/icon';
import { ProjectFeedbackDialog } from '../project-feedback-dialog/project-feedback-dialog';

@Component({
  selector: 'app-header',
  imports: [MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header {
  constructor(private dialog: MatDialog,private cdr: ChangeDetectorRef){}


    isSideNavOpen = false;
toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }
  

  openInfoDialog() {
    this.dialog.open(ProjectFeedbackDialog, {
     data: {rating:4},
      
      width:'568px',
      height:'477px !important',
      position: { top: '96px', left: '436px' },
      panelClass: 'hover-dialog'
    });
  }
}
