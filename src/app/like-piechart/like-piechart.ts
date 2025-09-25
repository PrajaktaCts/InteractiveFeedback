import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ChartType, ChartData, ChartOptions, Chart } from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { FeedbackService } from '../feedback-service';
@Component({
  selector: 'app-like-piechart',
  imports: [CommonModule,BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './like-piechart.html',
  styleUrl: './like-piechart.css'
})
export class LikePiechart implements OnInit{
  constructor(private dataser:FeedbackService,private cdr: ChangeDetectorRef){console.log('Likechart Created')}
  ngOnInit(): void {
    console.log('Likechart Initialize');
    this.getAllFeedback();
    this.setupChart();
  }

  pieChartType: ChartType = 'pie';
  pieChartData!: ChartData<'pie', number[], string> ;

  likePercent: number = 0;
  dislikePercent: number = 0;
  likeCount: number = 0;
  dislikeCount :number=0;
  getAllFeedback(){
    this.dataser.getAllFeedback().subscribe((res)=>{
      //console.log(res[0]);
      const totalFeedback = res.length;
      this.likeCount = res.filter((item: { like: any; }) => item.like).length;
      this.dislikeCount = res.filter((item: { dislike: any; }) => item.dislike).length;

    // console.log(`Likes: ${likeCount}, Dislikes: ${dislikeCount}`);
    // Calculate percentages
    const likePercentage = totalFeedback > 0 ? (this.likeCount / totalFeedback) * 100 : 0;
    const dislikePercentage = totalFeedback > 0 ? (this.dislikeCount / totalFeedback) * 100 : 0;

    // console.log(`Likes: ${this.likeCount} (${likePercentage.toFixed(2)}%)`);
    // console.log(`Dislikes: ${this.dislikeCount} (${dislikePercentage.toFixed(2)}%)`);
      console.log("Likes Count:",this.likeCount)
      console.log("Dislikes Count:",this.dislikeCount)
    // You can store these too
    this.likePercent = parseFloat(likePercentage.toFixed(2));
    this.dislikePercent = parseFloat(dislikePercentage.toFixed(2));
    // console.log(this.likePercent,this.dislikePercent);
    this.setupChart();
    });
  }

  setupChart(){
    
//console.log('LikePercentage',this.likePercent)
const total = this.likePercent + this.dislikePercent;
  this.pieChartData = {
    labels: [
    `Likes (${((this.likePercent / total) * 100).toFixed(2)}%)`,
    `Dislikes (${((this.dislikePercent / total) * 100).toFixed(2)}%)`
  ],
    datasets: [{
      data: [this.likeCount ,this.dislikeCount],
      backgroundColor: ['#008CC3', '#B42846']
    }]
  };
  this.cdr.detectChanges(); 
  }


  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right',
        labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        // pointStyleWidth:20,
        boxWidth:8,
        boxHeight:8,
        

        color: '#333',           // Text color
        font: {
          size: 12,
          weight: 'bold',
          family: 'Gotham',
          lineHeight:'100%',
        },
        padding: 20,
        
        
      }
       },
      tooltip: { enabled: true ,
        
      },
      
    }
  };
}
