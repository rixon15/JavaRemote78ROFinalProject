import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule,} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForOf, NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ProductsService} from '../../services/products.service';
import {MatInputModule} from '@angular/material/input';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-add-edit-product',
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatIconModule,
    NgForOf,
  ],
  standalone: true,
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnChanges {
  @Input() product?: Product | null;

  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      images: this.formBuilder.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.product) {
      this.productForm = this.formBuilder.group({
        name: [this.product.name, Validators.required],
        description: [this.product.description, Validators.required],
        price: [this.product.price, [Validators.required, Validators.min(0)]],
        images: this.formBuilder.array([])
      });

      for (let img of this.product.images) {
        this.onAddImage(img.imageUrl);
      }
    } else {
      this.setupForm();
    }
  }


  onSubmit(): void {
    if (this.productForm.valid) {

      let body: Product = {
        id: this.product ? this.product.id : null,
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        images: this.productForm.value.images
      };

      if (body.id == null) {
        this.productsService.createProduct(body);
      } else {
        this.productsService.updateProduct(body);
      }

      this.setupForm();
    }
  }

  onRemove(): void {
    if (this.product) {
      this.productsService.deleteProduct(this.product.id);
    }
  }

  onAddImage(url?: string): void {
    this.images.push(
      this.formBuilder.group({
        imageUrl: [url ? url : ''],
      })
    );
  }

  onRemoveImage(index: number): void {
    this.images.removeAt(index);
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  private setupForm() {
    this.product = null;

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      images: this.formBuilder.array([])
    });
  }
}
