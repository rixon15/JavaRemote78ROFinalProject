import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/user.model';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-user-deleted-list',
  imports: [MatCardModule, MatButtonModule, NgIf],
  standalone: true,
  templateUrl: './user-deleted-list.component.html',
  styleUrl: './user-deleted-list.component.css'
})
export class UserDeletedListComponent {
  deletedUsers: Array<User> = [];

  constructor(public usersService: UsersService) {
    this.usersService.getDeletedUsers().subscribe((deletedUsers: Array<User>) => {
      this.deletedUsers = deletedUsers;
    })
  }

  onRecover(user:User):void {
    this.usersService.recoverUser(user.id);
  }
}
