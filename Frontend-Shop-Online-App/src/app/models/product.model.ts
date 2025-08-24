import {ProductImage} from './product-image.model';

export class Product {
  id: any;
  name: string;
  description: string;
  price: number;
  images: Array<ProductImage>;

  // Constructor
  constructor(id: any, name: string, description: string, price: number, images: Array<ProductImage>) {
    this.id = id;
    this.images = images;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
