import { Component, input, output } from '@angular/core';
import { TableInterface } from '@app/core/interfaces/components.interface';
import { AngularModule } from '@app/shared/modules';
import { CapitalizeFirstLetterPipe } from '@app/shared/pipes/capitalize-first-letter.pipe';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  imports: [AngularModule, ButtonModule, TableModule, CapitalizeFirstLetterPipe],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  structureTable = input<TableInterface>();
  isLoadingTable = input<boolean>();
  actionEvent = output<{ item: any, action: string }>();

  constructor() { }

  ngOnInit() {}

  eventAction(item: any, action: string) {
    this.actionEvent.emit({ item, action });
  }
}
