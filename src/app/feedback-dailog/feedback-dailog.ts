import { ChangeDetectorRef, Component, ElementRef, inject, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormField, MatFormFieldControl, MatFormFieldModule,  MatLabel} from '@angular/material/form-field';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { CommonModule, NgFor } from '@angular/common';
import { Feedback } from '../feedback/feedback';
import { FeedbackService } from '../feedback-service';
import { title } from 'process';

import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-feedback-dailog',
  imports: [ReactiveFormsModule,CommonModule,MatFormField,MatInputModule,MatIconModule,FormsModule,MatButtonModule,NgFor,MatChipsModule],
  templateUrl: './feedback-dailog.html',
  styleUrl: './feedback-dailog.css'
})
export class FeedbackDailog {
 
   @ViewChild('submitSection') submitSection!: ElementRef;
  @ViewChild('dialogContent') dialogContent!: ElementRef;

  scrollToSubmitIfNeeded() {
    setTimeout(() => {
    this.submitSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }, 0);
  }

constructor(private cdr: ChangeDetectorRef,@Inject(MAT_DIALOG_DATA) public data: { title: string },private dialogRef: MatDialogRef<FeedbackDailog>,private dataService: FeedbackService,private fb: FormBuilder,private toastr: ToastrService) {}
feedbackForm!: FormGroup;
    reaction: 'like' | 'dislike' | null = null;
    isLiked: boolean = false;
  isDisliked: boolean = false;
  rating: number = 0;
  comments: string = '';

  closeDialog() {
  this.dialogRef.close();
}

  ngOnInit() {
    this.dataService.getAllFeedback().subscribe((res)=>{
      console.log(res);
    })

    
  this.suggestedTags = [this.data.title];
  this.feedbackForm = this.fb.group({
    section:[this.data.title],
      comments: ['', [Validators.required, Validators.minLength(3)]],
      like: [false],
      dislike:[false],
      rating: [0, [Validators.min(1)]],
      tag:[''],
      user_ID:1
    });
    this.cdr.detectChanges();
}
readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  suggestedTags: string[] = ['Project']; // default tag

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.suggestedTags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.suggestedTags.indexOf(tag);
    if (index >= 0) {
      this.suggestedTags.splice(index, 1);
    }
  }
  submitTag(input: HTMLInputElement): void {
  const value = input.value.trim();
  if (value) {
    this.suggestedTags.push(value);
    input.value = '';
  }
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
error:any;
  AddFeedback(){
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
    formData.append('tag', this.suggestedTags.join(','));

    for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}


    this.dataService.addFeedback(formData).subscribe((res) => {
      console.log(res);
      console.log("Feedback submitted successfully");
      console.log('Liked:', this.isLiked);
    console.log('Disliked:', this.isDisliked);
    console.log('Rating:', this.rating);
    console.log('Comment:', feedback.comments);
    this.dialogRef.close();
    this.toastr.success('Thanks for your feedback!', 'Success');
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
