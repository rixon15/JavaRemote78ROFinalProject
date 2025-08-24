import {Component, EventEmitter, Output} from '@angular/core';
import {User} from '../../models/user.model';
import {UsersService} from '../../services/users.service';
import {MatCardModule} from '@angular/material/card';
import {UserPreviewComponent} from '../user-preview/user-preview.component';

@Component({
  selector: 'app-user-list',
  imports: [MatCardModule, UserPreviewComponent],
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Output() selectUserEvent: EventEmitter<User>;

  users: Array<User> = [];

  constructor(public userService: UsersService) {
    this.selectUserEvent = new EventEmitter();

    this.userService.getUsers().subscribe((users: Array<User>) => {
      this.users = users;
    });
  }

  onSelect(user: User) {
    this.selectUserEvent.emit(user);
  }

}
