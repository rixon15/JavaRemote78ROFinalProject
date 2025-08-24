import { Component } from '@angular/core';
import {ConfigurationService} from '../../services/configuration.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  author: string = '';
  group: string = '';
  projectTitle: string = '';

  constructor(private configurationService: ConfigurationService) {
    this.author = this.configurationService.footerConfig().author;
    this.group = this.configurationService.footerConfig().group;
    this.projectTitle = this.configurationService.footerConfig().projectTitle;
  }

}
