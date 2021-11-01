import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User = new User();
  isIdPresent: boolean;
  errorMessage: string = '';

  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService) { 
  }

  ngOnInit(): void {
    this.isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(this.isIdPresent){
      const id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._userService.getUser(id).subscribe(
        data => {
          this.user = data;
          this.user.user_id = id;
          console.log(this.user.username)
        });
    }
  }

  saveUser() {
    this._userService.saveUser(this.user).subscribe(
      data => {
        console.log('response', data);
          
        },
        err => {
          console.error(err.error);
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
        }
      )
      window.location.reload();
      this._router.navigateByUrl("/profile/"+this.user.user_id);

}

}
