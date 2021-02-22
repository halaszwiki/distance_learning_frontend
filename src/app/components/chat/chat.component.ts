import { Component } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  input;
  constructor(public wsService: WebSocketService) {
    wsService.initializeWebSocketConnection();
  }

  sendMessage() {
    if (this.input) {
      this.wsService.sendMessage(this.input);
      this.input = '';
    }
  }
}
