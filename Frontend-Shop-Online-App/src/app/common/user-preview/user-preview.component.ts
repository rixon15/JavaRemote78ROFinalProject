import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user-preview',
  imports: [
    MatCard,
    MatCardContent,
    NgIf
  ],
  standalone: true,
  templateUrl: './user-preview.component.html',
  styleUrl: './user-preview.component.css'
})
export class UserPreviewComponent {
  @Input() user?: User

  constructor(public userService: UsersService) {
  }

}
