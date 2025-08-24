import { Component } from '@angular/core';
import {AddEditProductComponent} from '../add-edit-product/add-edit-product.component';
import {ProductDeletedListComponent} from '../../common/product-deleted-list/product-deleted-list.component';
import {ProductListComponent} from '../../common/product-list/product-list.component';
import {CommandListComponent} from '../../common/command-list/command-list.component';
import {CommandDeletedListComponent} from '../../common/command-deleted-list/command-deleted-list.component';

@Component({
  selector: 'app-dashboard-commands',
  imports: [
    CommandListComponent,
    CommandDeletedListComponent
  ],
  standalone: true,
  templateUrl: './dashboard-commands.component.html',
  styleUrl: './dashboard-commands.component.css'
})
export class DashboardCommandsComponent {

}
