import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MenuComponent} from '../common/menu/menu.component';
import {MatButtonModule} from '@angular/material/button';
import {UserListComponent} from '../common/user-list/user-list.component';
import {AddEditUserComponent} from './add-edit-user/add-edit-user.component';
import {DashboardUsersComponent} from './dashboard-users/dashboard-users.component';
import {DashboardProductsComponent} from './dashboard-products/dashboard-products.component';
import {MatCard, MatCardContent, MatCardModule, MatCardTitle} from '@angular/material/card';
import {TitleCasePipe} from '@angular/common';
import {DashboardCommandsComponent} from './dashboard-commands/dashboard-commands.component';
import {MatIconModule} from '@angular/material/icon';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, DashboardUsersComponent, DashboardProductsComponent, MatCardModule, TitleCasePipe, DashboardCommandsComponent,],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentView = 'admin';

  options: Array<string> = ['users', 'products', 'commands'];

  constructor(public usersService: UsersService) {
  }

  onOption(option: string) {
    this.currentView = option;
  }
}
