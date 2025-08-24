import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user: User | null;

  private usersBehaviourSubject: BehaviorSubject<Array<User>>;
  private usersDeletedBehaviourSubject: BehaviorSubject<Array<User>>;


  constructor(private httpClient: HttpClient) {
    this.usersBehaviourSubject = new BehaviorSubject<Array<User>>([]);
    this.usersDeletedBehaviourSubject = new BehaviorSubject<Array<User>>([]);

    this.getAllUsers();
    this.getAllDeletedUsers();

    // get user from local storage
    const userJson = localStorage.getItem('user-info');
    this.user = userJson ? JSON.parse(userJson) : null;
  }

  public saveUser(user: User): void {
    localStorage.setItem('user-info', JSON.stringify(user));

    this.user = user;
  }

  public logout(): void {
    this.user = null;

    localStorage.removeItem('user-info');
  }

  public getCurrentUser(): User {
    return this.user!
  }

  public getInitials(name: string): string {
    if (name == null || name.length == 0) {
      return 'N/A';
    }

    return name
      .split(' ')
      .map(word => word[0]?.toUpperCase() || '')
      .join('');
  }

  public getUsers() {
    return this.usersBehaviourSubject.asObservable();
  }

  public getDeletedUsers() {
    return this.usersDeletedBehaviourSubject.asObservable();
  }

  // CRUD
  // - C -> Create
  // - R -> Read
  // - U -> Update
  // - D -> Delete

  public getAllUsers(): void {
    this.httpClient.get('http://localhost:8081/users').subscribe((response: any) => {
      console.log(response);

      this.usersBehaviourSubject.next(response.data);
    });
  }

  public getAllDeletedUsers(): void {
    this.httpClient.get('http://localhost:8081/users/recover').subscribe((response: any) => {
      console.log(response);

      this.usersDeletedBehaviourSubject.next(response.data);
    });
  }

  public getUserById(id: number) {
    return this.httpClient.get(`http://localhost:8081/users/${id}}`);
  }

  public createUser(body: User) {
    this.httpClient.post(`http://localhost:8081/users`, body).subscribe((response: any) => {
      console.log(response);

      this.getAllUsers();
    });
  }

  public updateUser(body: User) {
    this.httpClient.put(`http://localhost:8081/users`, body).subscribe((response: any) => {
      console.log(response);

      this.getAllUsers();
    });
  }

  public deleteUser(id: number) {
    this.httpClient.delete(`http://localhost:8081/users/${id}`).subscribe((response: any) => {
      console.log(response);

      this.getAllUsers();
      this.getAllDeletedUsers();
    });
  }

  public recoverUser(id: number) {
    this.httpClient.post(`http://localhost:8081/users/recover/${id}`, {}).subscribe((response: any) => {
      console.log(response);

      this.getAllUsers();
      this.getAllDeletedUsers();
    });
  }
}
