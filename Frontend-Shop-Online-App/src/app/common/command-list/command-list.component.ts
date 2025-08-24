import {Component} from '@angular/core';
import {Command} from '../../models/command.model';
import {CommandsService} from '../../services/commands.service';
import {UserPreviewComponent} from '../user-preview/user-preview.component';
import {CurrencyPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-command-list',
  imports: [
    UserPreviewComponent,
    CurrencyPipe,
    MatIcon,
    MatCardModule,
    MatButton,
  ],
  standalone: true,
  templateUrl: './command-list.component.html',
  styleUrl: './command-list.component.css'
})
export class CommandListComponent {
  protected commands: Array<Command> = [];

  constructor(private commandsService: CommandsService) {
    this.commandsService.getCommands().subscribe((commands: Array<Command>) => {
      this.commands = commands;
    });
  }

  onRemove(id: number) {
    this.commandsService.deleteCommand(id);
  }

}
