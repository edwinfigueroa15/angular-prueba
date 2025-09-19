import { Component, inject, signal } from '@angular/core';
import { AngularModule } from '@app/shared/modules';
import { Table } from '@app/shared/components/table/table';
import { TableInterface } from '@app/core/interfaces/components.interface';
import { FundsService } from '@app/core/services/funds.service';
import { UserStoreService } from '@app/core/services/user-store.service';
import { Fund } from '@app/core/interfaces/db.mocks.interface';

// PrimeNG
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-subscription',
  imports: [AngularModule, Table, Toast],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss',
  providers: [MessageService]
})
export class Subscription {
  private _fundsService = inject(FundsService);
  private _userStoreService = inject(UserStoreService);
  private _messageService = inject(MessageService);

  isLoadingTable = signal<boolean>(true);
  structureTable: TableInterface = {
    data: [],
    structure: [
      { label: 'ID', sort: true, key: 'id' },
      { label: 'Nombre', sort: true, key: 'name' },
      { label: 'Monto mínimo', sort: true, key: 'minimum', formatMoney: true },
      { label: 'Categoría', sort: true, key: 'category' },
      { label: 'Acciones', sort: true, key: 'actions' },
    ],
    options: {
      paginator: {
        show: true,
        rows: 5,
        perPage: [5, 10, 20]
      },
      actions: {
        show: true,
        actionsList: [
          { key: 'linkage', icon: 'pi pi-link', severity: 'info', loading: false, disabled: false },
        ]
      }
    }
  }

  ngOnInit() {
    this.getAllFunds();
  }

  getAllFunds() {
    this._fundsService.getAll().subscribe({
      next: (response) => {
        let funds: Fund[] = response;
        const portfolio = this._userStoreService.user()?.portfolio;
        if(portfolio?.length) {
          funds = response.filter(fund => !portfolio.some(item => item.fundId === fund.id));
        }
        this.structureTable.data = funds;
        this.isLoadingTable.set(false);
      },
      error: (error) => {
        console.log(error);
        this.isLoadingTable.set(false);
      }
    });
  }

  actionEvent(event: { item: Fund, action: string }) {
    switch (event.action) {
      case 'linkage':
        this.linkage(event.item);
        break;
    }
  }

  linkage(fund: Fund) {
    const user = this._userStoreService.user();
    if(!user || user?.balance! < fund.minimum) {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: `No tiene saldo disponible para vincularse al fondo ${fund.name}`, life: 5000 });
      return;
    }

    this._fundsService.createSubscription(fund).subscribe({
      next: () => {
        this.getAllFunds();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
