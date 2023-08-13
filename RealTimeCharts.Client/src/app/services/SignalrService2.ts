//create connection
// on view update message from client
//notify server we r watching
//start connection  ?? use send(also promise but not wait for response) or invoke (promise wait for response)

import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { CustomLogger } from '../log/customeLogger';
import CustomRetryPolicy from '../RetryPolicy/CustomRetryPolicy';

@Injectable({
  providedIn: 'root'
})
export class SignalrService2 {
  public activeUserCount: number;
  private hubConnection: signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                          .configureLogging(signalR.LogLevel.Trace)
                          .configureLogging(new CustomLogger())
                          .withUrl('https://localhost:5001/userCount', {transport : signalR.HttpTransportType.WebSockets
                                                | signalR.HttpTransportType.LongPolling | signalR.HttpTransportType.ServerSentEvents})
                            //.withAutomaticReconnect()
                            
                            .withAutomaticReconnect(new CustomRetryPolicy())
                            .build();
     
      this.hubConnection
        .start()
        .then(() => {
            console.log('Connection started');
            //this.notify();
        })
        .catch(err => console.log('Error while starting connection: ' + err))

        this.hubConnection.onreconnecting((error : Error) => {
            console.log('------------------start reconnecting------------------');
        })
        this.hubConnection.onreconnected((connectionId : string) => {
            console.log(connectionId + 'is reconnected');
        })
        this.hubConnection.onclose((error : Error) => {
            alert("are you want to close ")
            console.log("close")
        })
    }
    public close(){
        this.hubConnection.stop();
    }
    public receive = () => {
      this.hubConnection.on('activeusers', (data) => {
        this.activeUserCount = data;
        console.log('active user data : ', this.activeUserCount);
      });
    }
  
    // public notify = () => {
    //   this.hubConnection.send("ActiveUsers") // Pass any necessary data as an argument, if needed
    //     .catch(err => console.error(err));
    // }
}
