import {Component} from '@angular/core';
import {ProductListComponent} from '../common/product-list/product-list.component';
import {FooterComponent} from '../common/footer/footer.component';
import {HeaderComponent} from '../common/header/header.component';

@Component({
  selector: 'app-home',
  imports: [ProductListComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
