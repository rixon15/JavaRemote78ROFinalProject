import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {NgIf} from '@angular/common';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-add-edit-user',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule, MatSelectModule, NgIf, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css'
})
export class AddEditUserComponent implements OnChanges {
  @Input() user?: User | null;

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.userForm = this.formBuilder.group({
        name: [this.user.name, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        password: ['', Validators.required],
        phone: [this.user.phone, Validators.required],
        address: [this.user.address, Validators.required],
      });
    } else {
      this.setupForm();
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);

      let body: User = new User(
        this.user ? this.user.id : null,
        this.userForm.value.name,
        this.userForm.value.email,
        this.userForm.value.password,
        this.userForm.value.phone,
        this.userForm.value.address,
        this.user ? this.user.userRole : 'CUSTOMER',
      )

      if (body.id == null) {
        this.usersService.createUser(body);
      } else {
        this.usersService.updateUser(body);
      }

      this.setupForm();
    }
  }

  onRemove(): void {
    if(this.user) {
      this.usersService.deleteUser(this.user.id);
    } else {
      alert('Utilizatorul nu exista!');
    }
  }

  private setupForm() {
    this.user = null;

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
}
