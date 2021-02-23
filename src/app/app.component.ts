import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { StompService } from 'ng2-stomp-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService/*, stomp: StompService*/) {
    /*
    stomp.configure({
      host:'test.com',
      debug:true,
      queue:{'init':false}
    });

    stomp.startConnect().then(() => {
      console.log('connected');
    });*/
   }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

 logout(){
  window.sessionStorage.clear();
  window.location.reload();
 }
}