import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Console } from 'console';
import { ChatMessage } from 'src/app/models/chatMessage';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  
  constructor(public wsService: WebSocketService) {}

  ngOnInit(): void {
    this.wsService.connect();
  }

    sendMessage(sendForm: NgForm) {
      this.wsService.sendMessage(sendForm.value.message);
      sendForm.controls.message.reset();
    }
}
