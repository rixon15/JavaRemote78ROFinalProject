import { Component } from '@angular/core';
import {Command} from '../../models/command.model';
import {CommandsService} from '../../services/commands.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {UserPreviewComponent} from '../user-preview/user-preview.component';
import {CurrencyPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-command-deleted-list',
  imports: [MatCardModule, MatButtonModule,UserPreviewComponent, CurrencyPipe, MatIconModule],
  standalone: true,
  templateUrl: './command-deleted-list.component.html',
  styleUrl: './command-deleted-list.component.css'
})
export class CommandDeletedListComponent {
  protected commandsDeleted: Array<Command> = [];

  constructor(private commandsService: CommandsService) {
    this.commandsService.getDeletedCommands().subscribe((commands: Array<Command>) => {
      this.commandsDeleted = commands;
    });
  }

  onRecover(id: number) {
    this.commandsService.recoverCommand(id);
  }
}
