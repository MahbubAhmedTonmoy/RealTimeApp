import { Component, OnInit } from '@angular/core';
import { SignalrService } from './services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration, ChartType } from 'chart.js';
import { SignalrService2 } from './services/SignalrService2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        min: 0
      }
    }
  };

  chartLabels: string[] = ['Real time data for the chart'];
  chartType: ChartType = 'bar';
  chartLegend: boolean = true;

  // constructor(public signalRService: SignalrService, private http: HttpClient) { }

  // ngOnInit() {
  //   this.signalRService.startConnection();
  //   this.signalRService.addTransferChartDataListener();
  //   this.signalRService.addBroadcastChartDataListener();  
  //   this.signalRService.addActiveUserListener(); 
  //   this.startHttpRequest();
  //   console.log('AppComponent initialized');
  // }

  // private startHttpRequest = () => {
  //   this.http.get('https://localhost:5001/api/chart')
  //     .subscribe(res => {
  //       console.log(res);
  //     })
  // }

  // addUserCount(){
  //   console.log('Add button clicked');
  //   this.signalRService.addActiveUserData(); 
  // }

  // public chartClicked = (event) => {
  //   console.log(event);
  //   this.signalRService.broadcastChartData();
  // }

  constructor(public signalRService2: SignalrService2) { }

  ngOnInit() {
    this.signalRService2.startConnection();
    this.signalRService2.receive();
  }
  onClose(){
    this.signalRService2.close();
  }

}
