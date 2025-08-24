import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../models/product.model';
import {CurrencyPipe, NgIf} from '@angular/common';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ProductsService} from '../../services/products.service';
import {CheckoutService} from '../../services/checkout.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-product-details',
  imports: [
    NgIf,
    CurrencyPipe,
    MatCard,
    MatCardContent,
    MatButtonModule,
    MatIconModule,
  ],
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  mainImage: string = '';

  product?: Product;

  constructor(private route: ActivatedRoute, private router:Router, private productsService: ProductsService, private checkoutService: CheckoutService, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];

      this.productsService.getProductById(id).subscribe((response: any) => {
        this.product = response.data;

        this.mainImage = this.product!.images[0].imageUrl;
      })


    });
  }

  onBuy() {
    if(this.usersService.getCurrentUser() == null) {
      this.router.navigateByUrl('/auth');
    } else {
      this.checkoutService.addProduct(this.product!);
    }
  }

  onChangeImage(imageUrl: string) {
    this.mainImage = imageUrl;
  }

}
