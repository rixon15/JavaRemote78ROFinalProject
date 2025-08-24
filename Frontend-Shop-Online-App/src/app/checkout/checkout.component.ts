import {AfterViewInit, Component} from '@angular/core';
import {CurrencyPipe, NgIf, NgStyle} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {UsersService} from '../services/users.service';
import {CheckoutService} from '../services/checkout.service';
import {Product} from '../models/product.model';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [MatCardModule, CurrencyPipe, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, NgStyle,],
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements AfterViewInit {

  total: number = 0;
  details: string = '';
  products: Array<Product> = [];

  constructor(public usersService: UsersService, private checkoutService: CheckoutService, private router: Router) {
    checkoutService.getCartProducts().subscribe((products: Array<Product>) => {
      if (products.length == 0) {
        this.total = 0;
        this.details = '';
        this.products = [];
      } else {
        this.products = products;

        this.total = 0;

        for (let prod of this.products) {
          this.total += prod.price;
        }
      }
    });
  }

  ngAfterViewInit(): void {
    let user = this.usersService.getCurrentUser();

    if (user == null) {
      this.router.navigateByUrl('/auth');
    }
  }


  onCheckout() {
    let items: Array<{ id: number }> = [];
    for (let prod of this.products) {
      items.push({id: prod.id});
    }

    let body = {
      details: this.details,
      date: new Date().toISOString().split('T')[0],
      paymentStatus: "PENDING",
      customer: {
        id: this.usersService.getCurrentUser().id
      },
      "products": items,
    }

    this.checkoutService.createCart(body).subscribe((response: any) => {
      console.log(response);

      if (response.status == 200) {
        alert(response.message);

        this.checkoutService.cleanUp();

        this.router.navigateByUrl('/home');
      }
    });
  }

  onDeleteProduct(id: number): void {
    this.checkoutService.removeProduct(id);
  }
}
