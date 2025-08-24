import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user?: User | null;

  constructor(private router: Router, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.user = this.usersService.getCurrentUser();
  }

  public onMyAccountPage(): void {
    this.router.navigateByUrl('/my-account').then(result => {
    });
  }

  public onHomePage(): void {
    this.router.navigateByUrl('/home').then(result => {
    });
  }

  public onCheckoutPage(): void {
    this.router.navigateByUrl('/checkout').then(result => {
    });
  }

  public onAdminPage(): void {
    this.router.navigateByUrl('/admin').then(result => {
    });
  }

  public onLoginPage(): void {
    this.router.navigateByUrl('/auth').then(result => {
    });
  }

  public onLogout(): void {
    this.user = null;

    this.usersService.logout();

    this.onHomePage();
  }

}
