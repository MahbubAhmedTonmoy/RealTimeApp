import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { ChartModel } from '../_interfaces/chartmodel.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public data: any[];
  public activeUserCount: number;
  public bradcastedData: ChartModel[];

  private hubConnection: signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              //.withUrl('https://localhost:5001/chart')
                              .withUrl('https://localhost:5001/userCount')
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
    
    public addTransferChartDataListener = () => {
      this.hubConnection.on('transferchartdata', (data) => {
        this.data = data;
        console.log(data);
      });
    }

    public broadcastChartData = () => {
      console.log('bradcastedData data2 : ');
      const data = this.data.map(m => {
        const temp = {
          data: m.data,
          label: m.label
        }
        return temp;
      });

      this.hubConnection.invoke('broadcastchartdata', data)
      .catch(err => console.error(err));
    }

    public addBroadcastChartDataListener = () => {
      this.hubConnection.on('broadcastchartdata', (data) => {
        this.bradcastedData = data;
        console.log('bradcastedData data : ', this.bradcastedData);
      })
    }

    public addActiveUserListener = () => {
      this.hubConnection.on('activeusers', (data) => {
        this.activeUserCount = data;
        console.log('active user data : ', this.activeUserCount);
      });
    }
  
    public addActiveUserData = () => {
      this.hubConnection.invoke('ActiveUsers') // Pass any necessary data as an argument, if needed
        .catch(err => console.error(err));
    }
}
