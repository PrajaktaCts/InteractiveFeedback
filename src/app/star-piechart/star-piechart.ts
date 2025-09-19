import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartType, ChartData, ChartOptions, Chart } from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { FeedbackService } from '../feedback-service';
@Component({
  selector: 'app-star-piechart',
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './star-piechart.html',
  providers: [provideCharts(withDefaultRegisterables())],
  styleUrl: './star-piechart.css'
})
export class StarPiechart implements OnInit {
  constructor(private dataser:FeedbackService,private cdr: ChangeDetectorRef){console.log('StarPieChartComponent created');}
  ngOnInit():void{
    console.log('StarPieChartComponent initialized');
    this.getAllFeedback();
    // this.setupChart();
    
  }
   ratingPercentages: { [key: number]: number } = {};
   dataArr:any;
   userId:any;
  getAllFeedback(){
    const ratings: number[] = [];
    this.dataser.getAllFeedback().subscribe((res)=>{
      console.log(res);
      this.userId=res[0].user_ID;
      //localStorage.setItem('userId',this.userId)
      console.log(this.userId)
      res.forEach((item:{ rating: number}) => {
      const rating = item?.rating;
      if (rating !== undefined) {
        
        ratings.push(rating);
      }
    });

    console.log("All Ratings:", ratings);

    // const ratingStats: { [key: number]: number } = {};
    // for (let i = 1; i <= 5; i++) {
    //   const filtered = ratings.filter(r => r === i);
    //   const average = filtered.length > 0
    //     ? filtered.reduce((sum, val) => sum + val, 0) / filtered.length
    //     : 0;
    //   ratingStats[i] = average;
    // }

    // console.log("Average for each rating:", ratingStats);
      
    // Count and calculate percentage for each rating
    const total = ratings.length;
    

    for (let i = 1; i <= 5; i++) {
      const count = ratings.filter(r => r === i).length;
      const percent = total > 0 ? (count / total) * 100 : 0;
      this.ratingPercentages[i] = parseFloat(percent.toFixed(2)); // Round to 2 decimal places
    }

    console.log("Ratings in %:", this.ratingPercentages);  
    // console.log(this.ratingPercentages[5])
    this.setupChart();

    })
    // console.log(this.ratingPercentages[5])
  }

  
  
  
  pieChartType: ChartType = 'pie';
  pieChartData!: ChartData<'pie', number[], string>;
setupChart() {
  // ✅ Now data is ready
  console.log(this.ratingPercentages[5]); // Use safely here
    this.dataArr = [
      this.ratingPercentages[5],
      this.ratingPercentages[4],
      this.ratingPercentages[3],
      this.ratingPercentages[2],
      this.ratingPercentages[1]
    ];
    console.log(this.dataArr)

  this.pieChartData = {
    labels: ['5 Star', '4 Stars', '3 Stars', '2 Stars', '1 Stars'],
    datasets: [{
      data: [this.ratingPercentages[5],this.ratingPercentages[4],this.ratingPercentages[3],this.ratingPercentages[2],this.ratingPercentages[1]],
      backgroundColor: ['#8979FF', '#FF928A', '#3CC3DF', '#FFAE4C', '#537FF1']
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
      tooltip: { enabled: true }
    }
  };
  
}
