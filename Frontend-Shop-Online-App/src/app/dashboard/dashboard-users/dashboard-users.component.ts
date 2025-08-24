import {Component} from '@angular/core';
import {UserListComponent} from '../../common/user-list/user-list.component';
import {AddEditUserComponent} from '../add-edit-user/add-edit-user.component';
import {User} from '../../models/user.model';
import {UserDeletedListComponent} from '../../common/user-deleted-list/user-deleted-list.component';

@Component({
  selector: 'app-dashboard-users',
  imports: [UserListComponent, AddEditUserComponent, UserDeletedListComponent],
  standalone: true,
  templateUrl: './dashboard-users.component.html',
  styleUrl: './dashboard-users.component.css'
})
export class DashboardUsersComponent {
  selectedUser?: User | null;

  constructor() {
  }

  onReceivedUser(user:User) {
    this.selectedUser = user;
  }


}
