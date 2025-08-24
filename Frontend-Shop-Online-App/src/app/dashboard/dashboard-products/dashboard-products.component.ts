import {Component} from '@angular/core';
import {ProductListComponent} from '../../common/product-list/product-list.component';
import {AddEditProductComponent} from '../add-edit-product/add-edit-product.component';
import {ProductDeletedListComponent} from '../../common/product-deleted-list/product-deleted-list.component';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-dashboard-products',
  imports: [ProductListComponent, AddEditProductComponent, ProductDeletedListComponent],
  standalone: true,
  templateUrl: './dashboard-products.component.html',
  styleUrl: './dashboard-products.component.css'
})
export class DashboardProductsComponent {
  selectedProduct: Product | null = null;

  constructor() {
  }

  onReceivedProduct(product: Product): void {
    this.selectedProduct = product;
  }

}
