import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product.model';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-product-deleted-list',
  imports: [MatCardModule, MatButtonModule],
  standalone: true,
  templateUrl: './product-deleted-list.component.html',
  styleUrl: './product-deleted-list.component.css'
})
export class ProductDeletedListComponent implements OnInit {
  deletedProducts: Array<any> = []

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsService.getDeletedProducts().subscribe((deletedProducts: Array<Product>) => {
      this.deletedProducts = deletedProducts;
    });
  }

  onRecover(product: Product): void {
    this.productsService.recoverProduct(product.id);
  }
}
