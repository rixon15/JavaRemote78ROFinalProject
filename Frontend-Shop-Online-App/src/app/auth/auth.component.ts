import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {UsersService} from '../services/users.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-auth',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgSwitch, NgIf, NgSwitchCase],
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  viewType: string = 'login';

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        address: [''],
        phone: [''],
        userRole: ['CUSTOMER']
      },
      {validators: this.passwordMatchValidator}
    );
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);

      this.authService.login(this.loginForm.value).subscribe((response: any) => {
        if (response.status == 200) {

          this.usersService.saveUser(response.data);

          alert(response.message);

          this.router.navigateByUrl('/home');
        }
      }, (err) => {
        alert(err.error.message);
      });
    }
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Register Data:', this.registerForm.value);

      this.authService.register(this.registerForm.value).subscribe((response: any) => {
        if (response.status == 200) {
          alert(response.message);

          this.viewType = 'login';
        }
      }, (err) => {
        alert(err.error.message);
      });
    }
  }
}


