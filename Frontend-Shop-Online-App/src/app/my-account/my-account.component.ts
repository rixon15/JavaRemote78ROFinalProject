import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {AddEditUserComponent} from '../dashboard/add-edit-user/add-edit-user.component';
import {UserPreviewComponent} from '../common/user-preview/user-preview.component';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-account',
  imports: [MatCardModule, AddEditUserComponent, UserPreviewComponent],
  standalone: true,
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit {
  user?: User;

  constructor(public userService: UsersService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();

    if(this.user == null) {
      this.router.navigateByUrl('/auth');
    }
  }


}
