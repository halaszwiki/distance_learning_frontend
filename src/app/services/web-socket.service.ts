import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chatMessage';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(public tokenService: TokenStorageService){}

  token = this.tokenService.getToken();
  stompClient;
  chatMessage: ChatMessage[] = [];

  connect() {
    const ws = new SockJS('http://localhost:8080/socket');
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({"X-Authorization":"Bearer " + this.token}, function(frame) {      
      that.stompClient.subscribe('/message', (message) => {
        if(message.body){
            that.chatMessage.push(JSON.parse(message.body));
        }
        });
      });
    }
  
  sendMessage(chatMessage){
    this.stompClient.send('/app/send/message' , {}, JSON.stringify(chatMessage));
  }
}