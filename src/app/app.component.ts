import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { StompService } from 'ng2-stomp-service';
import { User } from './models/user';

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
  user: User = new User();

  constructor(private tokenStorageService: TokenStorageService) {
   }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.isTeacher = this.user.roles.some(role => role.includes("ROLE_TEACHER")) ? true : false;
      console.log(this.user);
    }
  }

  getUser(): User {
    return this.user;
  }

 logout(){
  window.sessionStorage.clear();
  window.location.reload();
 }
}