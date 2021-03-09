import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(public tokenService: TokenStorageService){}

  token = this.tokenService.getToken();
  username = this.tokenService.getUser().username;
  stompClient: any;
  msg: String[] = [];

  connect() {
    const ws = new SockJS('http://localhost:8080/socket');
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({"X-Authorization":"Bearer " + this.token}, function(frame) {      console.log('Connected:' + frame); 
      that.stompClient.subscribe('/message', (message) => {
        if(message.body){
            that.msg.push(message.body);
        }
        });
      });
    }

  sendMessage(message) {
    this.stompClient.send('/app/send/message' , {}, message);
  }
}