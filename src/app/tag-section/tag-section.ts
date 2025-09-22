import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions, TagCloudComponent } from 'angular-tag-cloud-module';
import { FeedbackService } from '../feedback-service';

@Component({
  selector: 'app-tag-section',
  imports: [TagCloudComponent],
  templateUrl: './tag-section.html',
  styleUrl: './tag-section.css'
})
export class TagSection implements OnInit {
  constructor(private dataser:FeedbackService,private cdr: ChangeDetectorRef){console.log('Cloud tags created');}
 
options: CloudOptions = {
    width: 1000,
    height: 400,
    overflow: false
  };

  data: CloudData[] = [
    { text: 'Angular', weight: 10, color: '#ff4081' },
    { text: 'TypeScript', weight: 8, link: 'https://www.typescriptlang.org/' },
    { text: 'RxJS', weight: 6, tooltip: 'Reactive Extensions' },
    { text: 'NgRx', weight: 5 },
    { text: 'Forms', weight: 4 }
  ];

  ngOnInit(){
    
    this.getAllFeedbackTags();
    
  }

  getAllFeedbackTags(){
    this.dataser.getAllFeedback().subscribe((res)=>{
      console.log(res)
    //   
    // Step 1: Extract and split comma-separated tags
      const allTags = res.flatMap(item => {
        if (!item.tag) return [];
        return item.tag
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag); // remove empty strings
      });

      // Step 2: Count frequency of each tag
      const tagFrequency: { [key: string]: number } = {};
      allTags.forEach(tag => {
        tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
      });
console.log("tagFrequency:",tagFrequency)
      // Step 3: Convert to CloudData format with dynamic colors
      const colorPalette = ['#ff4081', '#3f51b5', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4'];
      let colorIndex = 0;

      this.data = Object.entries(tagFrequency).map(([tag, count]) => {
        const color = colorPalette[colorIndex % colorPalette.length];
        colorIndex++;
        return {
          text: tag,
          weight: count,
          color,
          tooltip: `${tag} (${count} times)`
        };
      });

      console.log('Processed tags:', this.data);
      console.log(this.data)
    this.cdr.detectChanges();
    },
    (err)=>{
      console.log(err.message)
    }
  )
  }
}
