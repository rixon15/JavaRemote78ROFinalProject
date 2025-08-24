import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsBehaviourSubject: BehaviorSubject<Array<Product>>;
  private productsDeletedBehaviourSubject: BehaviorSubject<Array<Product>>;


  constructor(private httpClient: HttpClient) {
    this.productsBehaviourSubject = new BehaviorSubject<Array<Product>>([]);
    this.productsDeletedBehaviourSubject = new BehaviorSubject<Array<Product>>([]);

    this.getAllProducts();
    this.getAllDeletedProducts();
  }

  public getProducts() {
    return this.productsBehaviourSubject.asObservable();
  }

  public getDeletedProducts() {
    return this.productsDeletedBehaviourSubject.asObservable();
  }

  // CRUD
  // - C -> Create
  // - R -> Read
  // - U -> Update
  // - D -> Delete

  public getAllProducts() {
    this.httpClient.get('http://localhost:8081/products').subscribe((response: any) => {
      console.log(response);

      this.productsBehaviourSubject.next(response.data);
    })
  }

  public getAllDeletedProducts() {
    this.httpClient.get('http://localhost:8081/products/recover').subscribe((response: any) => {
      console.log(response);

      this.productsDeletedBehaviourSubject.next(response.data);
    })
  }

  public getProductById(id: number) {
    return this.httpClient.get(`http://localhost:8081/products/${id}`);
  }

  public createProduct(body: Product) {
    this.httpClient.post(`http://localhost:8081/products`, body).subscribe((response: any) => {
      console.log(response);

      this.getAllProducts();
    });
  }

  public updateProduct(body: Product) {
    this.httpClient.put(`http://localhost:8081/products`, body).subscribe((response: any) => {
      console.log(response);

      this.getAllProducts();
    });
  }

  public deleteProduct(id: number) {
    this.httpClient.delete(`http://localhost:8081/products/${id}`).subscribe((response: any) => {
      console.log(response);

      this.getAllProducts();
      this.getAllDeletedProducts();
    });
  }

  public recoverProduct(id: number) {
    this.httpClient.post(`http://localhost:8081/products/recover/${id}`, {}).subscribe((response: any) => {
      console.log(response);

      this.getAllProducts();
      this.getAllDeletedProducts();
    });
  }

}
