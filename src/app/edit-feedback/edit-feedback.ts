import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FeedbackDailog } from '../feedback-dailog/feedback-dailog';
import { FeedbackService } from '../feedback-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, Location, NgFor } from '@angular/common';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-feedback',
  imports: [ReactiveFormsModule,CommonModule,MatFormField,MatInputModule,MatIconModule,FormsModule,MatButtonModule,RouterModule],
  templateUrl: './edit-feedback.html',
  styleUrl: './edit-feedback.css'
})
export class EditFeedback {

   @ViewChild('submitSection') submitSection!: ElementRef;
  @ViewChild('dialogContent') dialogContent!: ElementRef;

  scrollToSubmitIfNeeded() {
    setTimeout(() => {
    this.submitSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }, 0);
  }

  fID:any;
constructor(private location: Location, private router: Router,private cdr: ChangeDetectorRef,@Inject(MAT_DIALOG_DATA) public data: { id: string },private dialogRef: MatDialogRef<FeedbackDailog>,private dataService: FeedbackService,private fb: FormBuilder,private toastr: ToastrService) 
{
  console.log(this.location);

  this.fID=data.id;
  console.log('Received ID:', data.id);
  
}

feedbackForm!: FormGroup;
    reaction: 'like' | 'dislike' | null = null;
    isLiked: boolean = false;
  isDisliked: boolean = false;
  rating: number = 0;
  comments: string = '';

  closeDialog() {
  this.dialogRef.close();
}
selectedFeedback:any;
  ngOnInit() {
    this.feedbackForm = this.fb.group({
    section:['Header'],
      comments: ['', [Validators.required, Validators.minLength(3)]],
      like: [false],
      dislike:[false],
      rating: [0, [Validators.min(1)]],
      user_ID:1
    });
    console.log(this.feedbackForm.value)

    console.log("Update id:",this.fID)
    this.dataService.getAllFeedback().subscribe((feedbackList)=>{
      console.log('feedbackList',feedbackList);
       this.selectedFeedback=feedbackList.find(f=>f.id == this.fID);
      console.log('selected feedback:',this.selectedFeedback);
      console.log(this.selectedFeedback.id)

      if(this.selectedFeedback){
      const feedback={
      id:this.selectedFeedback.id,
      section:this.selectedFeedback.section,
      rating:this.selectedFeedback.rating,
      comments:this.selectedFeedback.comments
      }
      this.feedbackForm.patchValue({
        section: this.selectedFeedback.section,
        comments: this.selectedFeedback.comments,
        rating: this.selectedFeedback.rating,
        like: this.selectedFeedback.like,
        dislike: this.selectedFeedback.dislike
      });
      this.isLiked = this.selectedFeedback.like;
  this.isDisliked = this.selectedFeedback.dislike;

      console.log(this.feedbackForm.value)
      // this.isLiked = this.selectedFeedback.like;
      // this.isDisliked = this.selectedFeedback.dislike;
    
    // this.dataService.editFeedback(this.fID,feedback).subscribe((res)=>{
    //   console.log('Updated Feedback',res)
    // });
  }else{
    console.warn(`❌ Feedback with ID ${this.fID} not found.`);
  }

    })

   
  
  
    this.cdr.detectChanges();
}

  setReaction(type: 'like' | 'dislike') {
     if (type === 'like') {
      this.isLiked = !this.isLiked;
      if (this.isLiked) this.isDisliked = false;
    } else {
      this.isDisliked = !this.isDisliked;
      if (this.isDisliked) this.isLiked = false;
    }
    this.feedbackForm.patchValue({like:this.isLiked,dislike:this.isDisliked});
  }

  setRating(value: number) {
    this.rating = value;
    this.feedbackForm.patchValue({ rating: value });
  }
  getAllFeedback(){
    this.dataService.getAllFeedback().subscribe((res)=>{
      console.log(res);
    });
  }
error:any;
  EditFeedback(){
    console.log('Button clicked')
    // const feed={
    //   section:this.data.title,
    //   like:this.isLiked,
    //   dislike:this.isDisliked,
    //   rating:this.rating,
    //   comments:this.comment,
    //   user_ID:1

    // }
     const feedback=this.feedbackForm.value;
    console.log('data',feedback)
    if (this.feedbackForm.valid) {
   this.error = '';

   const formData = new FormData();
    formData.append('section', this.feedbackForm.get('section')?.value);
    formData.append('like', this.feedbackForm.get('like')?.value);
    formData.append('dislike', this.feedbackForm.get('dislike')?.value);
    formData.append('rating', this.feedbackForm.get('rating')?.value);
    formData.append('comments', this.feedbackForm.get('comments')?.value);
    formData.append('user_ID', this.feedbackForm.get('user_ID')?.value);

    for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}

 const feedback = {
    section: this.feedbackForm.get('section')?.value,
    like: this.feedbackForm.get('like')?.value,
    dislike: this.feedbackForm.get('dislike')?.value,
    rating: this.feedbackForm.get('rating')?.value,
    comments: this.feedbackForm.get('comments')?.value,
    user_ID: this.feedbackForm.get('user_ID')?.value
  };
    this.dataService.editFeedback(this.fID,feedback).subscribe((res) => {
      console.log(res);
      console.log("Feedback submitted successfully");
      console.log('Liked:', this.isLiked);
    console.log('Disliked:', this.isDisliked);
    console.log('Rating:', this.rating);
    console.log('Comment:', feedback.comments);
    this.dialogRef.close();
    this.toastr.success('feedback Updated Successfully!', 'Success');
    this.location.back();
    //this.getAllFeedback();
    // alert("Feedback submitted successfully");
    },
    (err) => {
      console.error("Error while submitting feedback:", err);
    }
    
  );
} else {
  this.error=' All fields are mandatory';
      console.warn('⚠️ Feedback form is invalid');
    }
    
  }

  submitFeedback() {
    // console.log('Liked:', this.isLiked);
    // console.log('Disliked:', this.isDisliked);
    // console.log('Rating:', this.rating);
    // console.log('Comment:', this.comment);
    // Add your backend logic or processing here
  }
}
