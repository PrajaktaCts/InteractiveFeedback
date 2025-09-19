import { ChangeDetectorRef, Component, Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { FeedbackService } from '../feedback-service';
import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditFeedback } from '../edit-feedback/edit-feedback';


@Component({
  selector: 'app-header-feedback',
  imports: [RouterModule,MatIconModule,MatButtonModule,MatToolbarModule,MatMenuModule,NgFor,CommonModule],
  templateUrl: './header-feedback.html',
  providers:[FeedbackService],
  styleUrl: './header-feedback.css'
})
export class HeaderFeedback implements OnInit {

  constructor(private dialog: MatDialog,private route: ActivatedRoute,private dataser:FeedbackService,@Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef,private toastr: ToastrService){}
  componentName: any;
  feedbackData:any;
  filteredFeedbackData:any;
  feedback$: Observable<any[]> = new Observable();
  title='Component List';
  users:any;
  userId:any;
   GetUsers(){
    this.dataser.getAllUsers().subscribe((res)=>{
      console.log(res);
      this.users=res ?? [];
      console.log(this.users)
      
      // console.log(this.userId);
      // this.users=res.filter((u: { userId: any; })=>u.userId == this.userId)
      // console.log(this.users)
      // localStorage.setItem('user',JSON.stringify(this.users))

    })
  }

  
 
  fId:any;
  openPopup(feedbackID:any) {
    this.dialog.open(EditFeedback,{
      data: { id: feedbackID }
    });
  }
  editFeedback(fId){
    console.log("Update id:",fId)
    this.dataser.getAllFeedback().subscribe((feedbackList)=>{
      console.log('feedbackList',feedbackList);
      const selectedFeedback=feedbackList.find(f=>f.id == fId);
      console.log('selected feedback:',selectedFeedback);

      if(selectedFeedback){
      const feedback={
      id:selectedFeedback.id,
      section:selectedFeedback.section,
      rating:selectedFeedback.rating,
      comments:selectedFeedback.comments
      }
    
    this.dataser.editFeedback(fId,feedback).subscribe((res)=>{
      console.log('Updated Feedback',res)
    });
  }else{
    console.warn(`❌ Feedback with ID ${fId} not found.`);
  }

    })
    
    
  }
  deleteFeedback(fId){
    console.log('Deleted Id:',fId)
    this.dataser.deleteFeedback(fId).subscribe((res)=>{
      console.log(res);
      this.getAllFeedback();
      this.toastr.error('Feedback Deleted Successfully!', 'Delete');
    },(err)=>{
      console.log("Response for Delete:",err.error.text)
    })
  }
   enrichedFeedbacks:any;
  filteredData:any;
    getAllFeedback(){
    this.dataser.getAllFeedback().subscribe((res)=>{
      console.log(res);
      this.feedbackData=res ?? [];
      
      this.filteredFeedbackData = this.feedbackData.filter((feedback: { section: any; }) => feedback.section === this.componentName);
      console.log(this.filteredFeedbackData)
      // this.filteredFeedbackData.forEach((item: { user_ID: any; }) =>{
      //   const id=item?.user_ID;
      //   console.log(id)
      // } )


   this.filteredData = this.filteredFeedbackData.map((feedback: { user_ID: any; }) => {
  const user = this.users.find((u: { userId: any; }) => u.userId === feedback.user_ID);
  return {
    ...feedback,
    username: user ? user.name : 'Unknown',
    role: user ? user.userRole :'Unknown'
  };
  
})
console.log(this.filteredData)

// this.filteredData = this.filteredData.filter((feedback: { section: any; }) => feedback.section === this.componentName);
// console.log(this.filteredData)



      // console.log(this.filteredFeedbackData)
      this.cdr.detectChanges();
    },(err)=>{
      console.log(err);
    })
  }
  username:any;
  role:any;
  uId:any;
  ngOnInit(): void {
  
   if (isPlatformBrowser(this.platformId)) {
    //this.deleteFeedback(this.fId);
    console.log("Logged in user:",this.userId)
    console.log(this.componentName)
    this.route.params.subscribe(params => {
    this.componentName = params['component']; // 'component' is the route parameter
    console.log(this.componentName)
    console.log("Initiated")
    this.userId=localStorage.getItem('userId');
    console.log(localStorage.getItem('user'))
    const storeUser=localStorage.getItem('user') ?? '{}';
    this.username=JSON.parse(storeUser).name
    this.uId=JSON.parse(storeUser).userId
    console.log(this.username)
    console.log(this.uId)
    // this.GetUsers()
    // this.getAllFeedback(); 

    // First get users
      this.dataser.getAllUsers().subscribe(users => {
        this.users = users ?? [];
        console.log('Users loaded:', this.users);

        // Then get feedback
        this.dataser.getAllFeedback().subscribe(feedbacks => {
          this.feedbackData = feedbacks ?? [];
          console.log('Feedback loaded:', this.feedbackData);

          this.filteredFeedbackData = this.feedbackData.filter(
            feedback => feedback.section === this.componentName
          );

          this.filteredData = this.filteredFeedbackData.map(feedback => {
            const user = this.users.find(u => u.userId === feedback.user_ID);
            
            return {
              ...feedback,
              username: user ? user.name : 'Unknown',
              role: user ? user.userRole :'Unknown'
            };
          }).sort((a, b) => {
    // Put logged-in user's feedback first
    if (a.user_ID === this.uId) return -1;
    if (b.user_ID === this.uId) return 1;
    return 0;
  });

          console.log('Final filtered data:', this.filteredData);
          console.log('Sorted feedback (logged-in user first):', this.filteredData.map(f => f.user_ID));

          this.cdr.detectChanges();
        });
      });
    
    
    
    });
    
  }
   
  }
  
}
