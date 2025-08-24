import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  public login(body: any) {
    return this.httpClient.post('http://localhost:8081/auth/login', body);
  }

  public register(body: any) {
    return this.httpClient.post('http://localhost:8081/auth/register', body);
  }
}
