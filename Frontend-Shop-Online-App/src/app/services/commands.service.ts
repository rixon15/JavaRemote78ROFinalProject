import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Command} from '../models/command.model';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  private commandsBehaviourSubject: BehaviorSubject<Array<Command>>;
  private commandsDeletedBehaviourSubject: BehaviorSubject<Array<Command>>;

  constructor(private httpClient: HttpClient) {
    this.commandsBehaviourSubject = new BehaviorSubject<Array<Command>>([]);
    this.commandsDeletedBehaviourSubject = new BehaviorSubject<Array<Command>>([]);

    this.getAllCommands();
    this.getAllDeletedCommands();
  }

  public getCommands() {
    return this.commandsBehaviourSubject.asObservable();
  }

  public getDeletedCommands() {
    return this.commandsDeletedBehaviourSubject.asObservable();
  }

  public getAllCommands() {
    this.httpClient.get('http://localhost:8081/commands').subscribe((response: any) => {
      console.log(response);

      this.commandsBehaviourSubject.next(response.data);
    });
  }

  public getAllDeletedCommands() {
    this.httpClient.get('http://localhost:8081/commands/recover').subscribe((response: any) => {
      console.log(response);

      this.commandsDeletedBehaviourSubject.next(response.data);
    });
  }

  public getCommandById(id: number) {
    this.httpClient.get(`http://localhost:8081/commands/${id}`).subscribe((response: any) => {
      console.log(response);
    });
  }

  public createCommand(body: {
    details: string,
    date: string,
    paymentStatus: string,
    customer: { id: number },
    products: Array<{ id: number }>
  }) {
    this.httpClient.post('http://localhost:8081/commands', body).subscribe((response: any) => {
      console.log(response);

      this.getAllCommands();
    });
  }

  public updateCommand(body: {
    details: string,
    date: string,
    paymentStatus: string,
    customer: { id: number },
    products: Array<{ id: number }>
  }) {
    this.httpClient.put('http://localhost:8081/commands', body).subscribe((response: any) => {
      console.log(response);

      this.getAllCommands();
    });
  }

  public deleteCommand(id: number) {
    this.httpClient.delete(`http://localhost:8081/commands/${id}`).subscribe((response: any) => {
      console.log(response);

      this.getAllCommands();
      this.getAllDeletedCommands();
    });
  }

  public recoverCommand(id: number) {
    this.httpClient.post(`http://localhost:8081/commands/recover/${id}`, {}).subscribe((response: any) => {
      console.log(response);

      this.getAllCommands();
      this.getAllDeletedCommands();
    });
  }

}
