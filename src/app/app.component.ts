import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { StompService } from 'ng2-stomp-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isTeacher = false;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) {
   }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.isTeacher = user.roles.some(role => role.includes("ROLE_TEACHER")) ? true : false;
      console.log(this.isTeacher);
      this.username = user.username;
    }
  }

 logout(){
  window.sessionStorage.clear();
  window.location.reload();
 }
}