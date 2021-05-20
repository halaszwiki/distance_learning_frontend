import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  id: number;

  constructor(private _userService: UserService, private _activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
      const id = +this._activatedRoute.snapshot.paramMap.get('id');
        this.getCurrentUser(id);
       
    }
  }

  getCurrentUser(id: number) {
    this._userService.getUser(id).subscribe(
      data => this.user = data
    )
  }
}

