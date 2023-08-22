import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.scss'],
  viewProviders:[{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class MultiselectDropdownComponent {
  @Input('items') items: any[] = [];
  @Input('controlName') controlName: string;
  @Input('isDropdown') isDropdown: boolean = true;
  @Input('placeholder') placeholder?: string = '';
  @Input('selectByField') selectByField?: string = 'name';
  @Output('selectedItem') selectedItem = new EventEmitter();
  filteredItems: any[] = [];

  findSuppliers(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    console.log(this.items)
    for (let i = 0; i < this.items.length; i++) {
      let supplier = this.items[i];
      if (supplier.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(supplier);
      }
    }
    this.filteredItems = filtered;
  }

  onSelect(event: any) {
    this.selectedItem.emit(event);
  }
}
