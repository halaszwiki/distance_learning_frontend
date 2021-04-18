import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private router: Router,
    public app: AppComponent) {
      this.user = app.getUser();
      console.log(this.user);
     }


  ngOnInit(): void {
  }
  
}
