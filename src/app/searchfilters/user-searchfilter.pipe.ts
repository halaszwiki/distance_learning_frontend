import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'usersearchfilter'
})
export class UserSearchfilterPipe implements PipeTransform {

  transform(users: User[], searchBox: string): User[] {
    if(!users || !searchBox){
      return users;
    }
    return users.filter(user => user.username.toLocaleLowerCase().includes(searchBox.toLocaleLowerCase()));
  }
}
