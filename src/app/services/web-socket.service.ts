import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(public tokenService: TokenStorageService){}

  public token = this.tokenService.getToken();
  public stompClient;
  public msg = [];

  connect() {
    const serverUrl = 'http://localhost:8080/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
  
    this.stompClient.connect({"X-Authorization":
    "Bearer " + this.token}, function(frame) {
      console.log('Connected:' + frame); 
      this.stompClient.subscribe('/message', (message) => {
        if (message.body) {
          this.msg.push(message.body);
        }
      });
    });
  }

  /*
var
 socket = new
 SockJS('/chat');
 stompClient = Stomp.over(socket); stompClient.connect({}, function(frame)
{ setConnected(true);
console.log('Connected:
 ' + frame); stompClient.subscribe('/topic/messages',
function(messageOutput)
{ showMessageOutput(JSON.parse(messageOutput.body));
 }); }); }



és a stompClient.connect-et kell
 módosítani ilyesmire:

stompClient.connect({"X-Authorization":
 "Bearer " + jwtToken}, function (frame) {...
  */

  sendMessage(message) {
    this.stompClient.send('/app/send/message' , {}, message);
  }
}