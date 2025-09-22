import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Feedback } from '../feedback/feedback';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';

import {MatInputModule} from '@angular/material/input';
import { FeedbackService } from '../feedback-service';
import { ToastrService } from 'ngx-toastr';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-project-feedback-dialog',
  imports: [ReactiveFormsModule,NgFor,MatIconModule,MatFormFieldModule,MatInputModule,MatButtonModule,CommonModule,MatChipsModule,],
  templateUrl: './project-feedback-dialog.html',
  styleUrl: './project-feedback-dialog.css'
})
export class ProjectFeedbackDialog implements OnInit {
    @ViewChild('submitSection') submitSection!: ElementRef;
  @ViewChild('dialogContent') dialogContent!: ElementRef;

  scrollToSubmitIfNeeded() {
    setTimeout(() => {
    this.submitSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }, 0);
  }
feedbackForm: FormGroup;
rating: number = 0;
  ratings = ['Excellent', 'Good', 'Average', 'Poor'];
setRating(value: number) {
    this.rating = value;
    this.feedbackForm.patchValue({ rating: value });
  }
  constructor(private cdr: ChangeDetectorRef,private dialogRef: MatDialogRef<ProjectFeedbackDialog>,@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private dataService: FeedbackService,private toastr: ToastrService) {
    this.feedbackForm = this.fb.group({
      section:['Project'],
      rating: [0,[Validators.required]],
      workedWell: ['',[Validators.required]],
      improved: ['',[Validators.required]],
      screenshot:[''],
      tag:[],
      // contactByEmail: [''],
      user_ID:1
      // contactByPhone: [false]
    });
  }
  selectedFile: File | null = null;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}
// suggestedTags: string[] = [];
// updateSuggestedTags(workedWell: string, improved: string) {
//   const combinedText = `${workedWell} ${improved}`.toLowerCase();
//   const keywords = ['performance', 'ui', 'speed', 'bugs', 'support', 'features', 'design', 'navigation'];

//   this.suggestedTags = keywords.filter(keyword => combinedText.includes(keyword));
// }

// removeTag(tag: string) {
//   this.suggestedTags = this.suggestedTags.filter(t => t !== tag);
// }

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
  ngOnInit(){
    console.log('ngOnInit called');
    
  //   this.feedbackForm.get('workedWell')?.valueChanges.subscribe(value => {
  //      console.log('Worked well changed:', value);
  //   this.updateSuggestedTags(value, this.feedbackForm.get('improved')?.value);
  //   console.log('Updated Tags:', this.suggestedTags);
  // });

  // this.feedbackForm.get('improved')?.valueChanges.subscribe(value => {
  //   this.updateSuggestedTags(this.feedbackForm.get('workedWell')?.value, value);
  // });
  this.cdr.detectChanges();
  }
  
closeDialog() {
  this.dialogRef.close();
}
error:any;
  onSubmit() {
    //console.log(this.feedbackForm.value);
    if (this.feedbackForm.valid) {
    this.error='';

    const formData = new FormData();
    formData.append('section', this.feedbackForm.get('section')?.value);
    formData.append('rating', this.feedbackForm.get('rating')?.value);
    formData.append('workedWell', this.feedbackForm.get('workedWell')?.value);
    formData.append('improved', this.feedbackForm.get('improved')?.value);
    formData.append('user_ID', this.feedbackForm.get('user_ID')?.value);
    formData.append('tag', this.suggestedTags.join(','));
    
    for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}


    if (this.selectedFile) {
      formData.append('screenshotFile', this.selectedFile);
      console.log('Scrrenshot',this.selectedFile)
    }

    this.dataService.addFeedback(formData).subscribe((res) => {
      console.log(res);
      console.log("Feedback submitted successfully");
    //   console.log('Rating:', this.rating);
    //   console.log('WorkedWell:', this.workedWell);
    // console.log('Disliked:', this.isDisliked);
    
    // console.log('Comment:', feedback.comments);
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
}
