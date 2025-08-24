import {User} from './user.model';
import {Product} from './product.model';

export class Command {
  id: number;
  date: string;
  details: string;
  total: number;
  paymentStatus: string;
  customer: User;
  products: Array<Product>;

  constructor(id: number, date: string, details: string, total: number, paymentStatus: string, customer: User, products: Array<Product>) {
    this.id = id;
    this.date = date;
    this.details = details;
    this.total = total;
    this.paymentStatus = paymentStatus;
    this.customer = customer;
    this.products = products;
  }
}

