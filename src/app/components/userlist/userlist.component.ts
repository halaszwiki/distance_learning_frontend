import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {


  users: User[] = [];
  searchBox: string;
  key: string = "name"

  constructor(private _userService: UserService,
    private _router: Router) { }

  ngOnInit(): void {
     
        this.listUsers();
      
  }

  sort(key: string){
    this.key = key;
  }

  delete(i: any){
    this.users.splice(i);
  }

  deleteUser(id: number){
    this._userService.deleteUser(id).subscribe(
  data => { console.log('deleted response', data);
    this.listUsers();
      }
    )
  }

  listUsers(){
    this._userService.getAllUser().subscribe(
      data => this.users = data
    )
  }

}
