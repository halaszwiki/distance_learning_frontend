import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  input: String;
  constructor(public wsService: WebSocketService) {
    
    wsService.connect();
  }

  sendMessage() {
    if (this.input) {
      this.wsService.sendMessage(this.input);
      this.input = '';
    }
  }
}
