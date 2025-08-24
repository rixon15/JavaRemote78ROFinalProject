import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {BehaviorSubject} from 'rxjs';
import {UsersService} from './users.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private cartBehaviourSubject: BehaviorSubject<Array<Product>>;


  constructor(private usersService: UsersService, private httpClient: HttpClient) {
    this.cartBehaviourSubject = new BehaviorSubject<Array<Product>>([]);
  }

  public getCartProducts() {
    return this.cartBehaviourSubject.asObservable();
  }

  public addProduct(product: Product): void {
    let products = this.cartBehaviourSubject.getValue();

    products.push(product);

    console.log(products);

    this.cartBehaviourSubject.next(products);
  }

  public removeProduct(productId: number): void {
    let products = this.cartBehaviourSubject.getValue();

    products = products.filter((prod) => prod.id != productId);

    this.cartBehaviourSubject.next(products);
  }

  public createCart(body: any) {
    return this.httpClient.post('http://localhost:8081/commands', body);
  }

  public cleanUp() {
    this.cartBehaviourSubject.next([]);
  }
}
