import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CurrencyPipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [MatCardModule, CurrencyPipe, MatButtonModule],
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  @Output() selectedProductEvent: EventEmitter<Product>;

  products: Array<any> = []

  constructor(private router: Router, private productsService: ProductsService) {
    this.selectedProductEvent = new EventEmitter<Product>();
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products: Array<Product>) => {
      this.products = products;
    });
  }

  onBuy(product: any, event: MouseEvent) {
    this.router.navigateByUrl(`/product-details/${product.id}`).then(result => {
      console.log(result ? `Product details page for product with id: ${product.id}` : '');

      event.stopPropagation();
    });
  }

  onSelectProduct(product: Product): void {
    this.selectedProductEvent.emit(product);
  }
}
