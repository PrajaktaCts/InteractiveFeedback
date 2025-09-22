import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartType, ChartData, ChartOptions, Chart } from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

import { Inject, PLATFORM_ID } from '@angular/core';
import { StarPiechart } from '../star-piechart/star-piechart';
import { LikePiechart } from '../like-piechart/like-piechart';
import { FeedbackService } from '../feedback-service';
import { TagSection } from '../tag-section/tag-section';



export interface PeriodicElement {
  Component: string;
  Star_Rating: number;
  Likes: number;
  Dislikes:number;
  Sample_Comments: string;
   hasMoreComments?: boolean;
}

export interface PortalElement {
  Star_Rating: number;
  What_Worked_Well: string;
  How_We_Can_Improve:string;
  Attach_Screenshot: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { Component: 'Header', Star_Rating:4.2, Likes: 18,   Dislikes: 3, Sample_Comments: 'Clean design; Could use more contrast'},
  { Component: 'Footer', Star_Rating:3.8, Likes: 12,   Dislikes: 5, Sample_Comments: 'Add quick links; Too much white space'},
  { Component: 'Navigation',  Star_Rating:4.5, Likes: 25,   Dislikes: 2, Sample_Comments: 'Easy to find sections; Dropdown opens slowly'},
  { Component: 'General(Page-Level)',Star_Rating:4.0, Likes: 20,   Dislikes: 4, Sample_Comments: 'Overall smooth experience; Mobile view could improve'},
  { Component: 'Geos Section',    Star_Rating:3.5, Likes: 10,   Dislikes: 6, Sample_Comments: 'Data is useful; Labels unclear'},
  { Component: 'Expandable Component',   Star_Rating:4.3, Likes: 17,   Dislikes: 2, Sample_Comments: 'Like the expand/collapse; Animation feels delayed'}
];

const PORTAL_DATA: PortalElement[] = [
  {  Star_Rating:4.2, What_Worked_Well: 'Order List',   How_We_Can_Improve: 'Orders', Attach_Screenshot: 'No'},
  {  Star_Rating:3.8, What_Worked_Well: 'Order List',   How_We_Can_Improve: 'Orders', Attach_Screenshot: 'No'},
  ];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,StarPiechart,LikePiechart,MatTableModule,MatToolbarModule,MatIconModule,MatButtonModule,MatMenuModule,RouterModule,TagSection ],
  providers: [provideCharts(withDefaultRegisterables()),FeedbackService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  displayedColumns: string[] = ['Component', 'Star_Rating', 'Likes', 'Dislikes', 'Sample_Comments'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  displayedPortalColumns: string[] = ['Star_Rating', 'What_Worked_Well', 'How_We_Can_Improve', 'Attach_Screenshot'];
  portalDataSource = new MatTableDataSource<PortalElement>();;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private dataser:FeedbackService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  

  user:any;
  GetUsers(){
    this.dataser.getAllUsers().subscribe((res)=>{
      console.log(res);
      console.log(this.user_Id);
      this.user=res.find((u: { userId: any; })=>u.userId == this.user_Id)
      console.log(this.user)
      localStorage.setItem('user',JSON.stringify(this.user))

    })
  }

  getAverageRatingByComponentFromAPI(feedbackList: any[], componentName: string): number {
  const filtered = feedbackList.filter(item => item.section === componentName);
  console.log(filtered)
  console.log(feedbackList)
  if (filtered.length === 0) return 0;

  const total = filtered.reduce((sum, item) => sum + item.rating, 0);
  return parseFloat((total / filtered.length).toFixed(2));
}

getTotalLikesByComponent(feedbackList: any[], componentName: string): number {
  return feedbackList
    .filter(item => item.section === componentName)
    .reduce((sum, item) => sum + (item.like ?? 0), 0);
}

getTotalDislikesByComponent(feedbackList: any[], componentName: string): number {
  return feedbackList
    .filter(item => item.section === componentName)
    .reduce((sum, item) => sum + (item.dislike ?? 0), 0);
}

getCommentsForSection(feedbackList: any[], sectionName: string): { preview: string, hasMore: boolean } {
  const comments = feedbackList
    .filter(item => item.section === sectionName && item.comments)
    .map(item => item.comments.trim());

  if (comments.length === 0) {
    return { preview: 'No Comments', hasMore: false };
  }

  const preview = comments.slice(0, 2).join('; ');
  const hasMore = comments.length > 2;

  return { preview, hasMore };
}



  user_Id:any=1;
  username:any;
  user_Role:any
  averageHeaderRating: number = 0;
  headerRating:any;
  footerRating:any;
  navigationRating:any;
  generalRating:any;
  geoRating :any;
  expandableRating:any;

  headerLikes = 0;
footerLikes = 0;
navigationLikes = 0;
generalLikes = 0;
geoLikes = 0;
expandableLikes = 0;

headerDislikes = 0;
footerDislikes = 0;
navigationDislikes = 0;
generalDislikes = 0;
geoDislikes = 0;
expandableDislikes = 0;

headerComments:any;
footerComments:any;
navigationComments:any;
generalComments:any;
geosComments:any;
expandableComments:any;

portalFeedback:any;
getFileName(url: string): string {
  return url?.split('/').pop() ?? 'image.png';
}



  ngOnInit(){
     if (isPlatformBrowser(this.platformId)) {
     console.log(PORTAL_DATA)
      
      console.log(this.displayedPortalColumns)
      console.log(this.dataSource.data)
    this.GetUsers();
    localStorage.setItem('userId',this.user_Id)
    console.log(localStorage.getItem('userId'))
    this.user_Id=localStorage.getItem('userId');
    console.log(localStorage.getItem('user'))
    const storeUser=localStorage.getItem('user') ?? '{}';
    this.username=JSON.parse(storeUser).name
    this.user_Role=JSON.parse(storeUser).userRole
    console.log(this.username)
    console.log(this.user_Role)

    
    this.dataser.getAllFeedback().subscribe((feedbackList) => {
  console.log(feedbackList);
   this.portalFeedback = feedbackList.filter(item => item.section === 'Project');
  console.log('Portal Level Feedback:',this.portalFeedback)
  console.log()


  this.headerLikes = this.getTotalLikesByComponent(feedbackList, 'Header');
  this.footerLikes = this.getTotalLikesByComponent(feedbackList, 'Footer');
  this.navigationLikes = this.getTotalLikesByComponent(feedbackList, 'Navigation');
  this.generalLikes = this.getTotalLikesByComponent(feedbackList, 'General(Page-Level)');
  this.geoLikes = this.getTotalLikesByComponent(feedbackList, 'Geos Section');
  this.expandableLikes = this.getTotalLikesByComponent(feedbackList, 'Expandable Component');

  this.headerDislikes = this.getTotalDislikesByComponent(feedbackList, 'Header');
  this.footerDislikes = this.getTotalDislikesByComponent(feedbackList, 'Footer');
  this.navigationDislikes = this.getTotalDislikesByComponent(feedbackList, 'Navigation');
  this.generalDislikes = this.getTotalDislikesByComponent(feedbackList, 'General(Page-Level)');
  this.geoDislikes = this.getTotalDislikesByComponent(feedbackList, 'Geos Section');
  this.expandableDislikes = this.getTotalDislikesByComponent(feedbackList, 'Expandable Component');
  
  console.log('header likes',this.headerLikes,this.headerDislikes);
   console.log('footer likes',this.footerLikes,this.footerDislikes);
    console.log('navigation like',this.navigationLikes,this.navigationDislikes);
     console.log('general likes',this.generalLikes,this.generalDislikes);
      console.log('geo likes',this.geoLikes,this.geoDislikes);
       console.log('expandable likes',this.expandableLikes,this.expandableDislikes);


  
  const headerAvg = this.getAverageRatingByComponentFromAPI(feedbackList, 'Header');
  console.log('⭐ Header Average Rating from API:', headerAvg);
  

  const footerAvg = this.getAverageRatingByComponentFromAPI(feedbackList, 'Footer');
  console.log('⭐ Footer Average Rating from API:', footerAvg);

  const navigationAvg = this.getAverageRatingByComponentFromAPI(feedbackList, 'Navigation');
  console.log('⭐ NAvigation Average Rating from API:', navigationAvg);

  const generalAvg = this.getAverageRatingByComponentFromAPI(feedbackList, 'General(Page-Level)');
  console.log('⭐ General Average Rating from API:', generalAvg);

  const geoAvg = this.getAverageRatingByComponentFromAPI(feedbackList, 'Geos Section');
  console.log('⭐ Geos Section Average Rating from API:', geoAvg);

  const expandableAvg = this.getAverageRatingByComponentFromAPI(feedbackList, 'Expandable Component' );
  console.log('⭐ Expandable Average Rating from API:', expandableAvg);

  this.headerComments = this.getCommentsForSection(feedbackList, 'Header');
  console.log('Header Comments:', this.headerComments);

  this.footerComments = this.getCommentsForSection(feedbackList, 'Footer');
  console.log('Footer Comments:', this.footerComments);

  this.navigationComments = this.getCommentsForSection(feedbackList, 'Navigation');
  console.log('Navigation Comments:', this.navigationComments);

  this.generalComments = this.getCommentsForSection(feedbackList, 'General(Page-Level)');
  console.log('General(Page-Level) Comments:', this.generalComments);

  this.geosComments = this.getCommentsForSection(feedbackList, 'Geos Section');
  console.log('Geos Section Comments:', this.geosComments);

  this.expandableComments = this.getCommentsForSection(feedbackList, 'Expandable Component');
  console.log('Expandable Comments:', this.expandableComments);

  // You can store these in variables to display in the template
  this.headerRating = headerAvg;
  this.footerRating = footerAvg;
  this.navigationRating = navigationAvg;
  this.generalRating = generalAvg;
  this.geoRating = geoAvg;
  this.expandableRating = expandableAvg;
  console.log('Genral Rating',this.generalRating)

  ELEMENT_DATA.forEach(item => {
     const commentData = this.getCommentsForSection(feedbackList, item.Component);
  switch (item.Component) {
    case 'Header':
      item.Star_Rating = this.headerRating;
      item.Likes=this.headerLikes;
      item.Dislikes=this.headerDislikes;
      //item.Sample_Comments=this.headerComments;
      break;
    case 'Footer':
      item.Star_Rating = this.footerRating;
      item.Likes=this.footerLikes;
      item.Dislikes=this.footerDislikes;
      //item.Sample_Comments=this.footerComments;
      break;
    case 'Navigation':
      item.Star_Rating = this.navigationRating;
      item.Likes=this.navigationLikes;
      item.Dislikes=this.navigationDislikes;
      //item.Sample_Comments=this.navigationComments;
      break;
    case 'General(Page-Level)':
      item.Star_Rating = this.generalRating;
      item.Likes=this.generalLikes;
      item.Dislikes=this.generalDislikes;
      //item.Sample_Comments=this.generalComments;
      break;
    case 'Geos Section':
      item.Star_Rating = this.geoRating;
      item.Likes=this.geoLikes;
      item.Dislikes=this.geoDislikes;
      //item.Sample_Comments=this.geosComments;
      break;
    case 'Expandable Component':
      item.Star_Rating = this.expandableRating;
      item.Likes=this.expandableLikes;
      item.Dislikes=this.expandableDislikes;
      //item.Sample_Comments=this.expandableComments;
      break;
  }
  item.Sample_Comments = commentData.preview;
  item.hasMoreComments = commentData.hasMore;
  console.log(`${item.Component} hasMoreComments:`, item.hasMoreComments);

});
const apiBaseUrl = 'https://localhost:44383';
const formattedPortalData: PortalElement[] = this.portalFeedback.map(item => ({
  Star_Rating: item.rating,
  What_Worked_Well: item.workedWell,
  How_We_Can_Improve: item.improved,
  Attach_Screenshot: item.screenshot ? `https://localhost:44383/api/Feedback/download/${encodeURIComponent(item.screenshot)}` : 'No'

}));
console.log('Formatted Data',formattedPortalData)

this.portalDataSource.data = formattedPortalData;

console.log('portalDataSourcedata Data',this.portalDataSource.data)

 
this.dataSource.data = ELEMENT_DATA;
//this.portalDataSource.data = PORTAL_DATA;


});

    }
  }
}
