import { Component, inject, signal } from '@angular/core';
import { AngularModule } from '@app/shared/modules';
import { Table } from '@app/shared/components/table/table';
import { TableInterface } from '@app/core/interfaces/components.interface';
import { FundsService } from '@app/core/services/funds.service';
import { UserStoreService } from '@app/core/services/user-store.service';
import { Fund } from '@app/core/interfaces/db.mocks.interface';

@Component({
  selector: 'app-subscription',
  imports: [AngularModule, Table],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss'
})
export class Subscription {
  private _fundsService = inject(FundsService);
  private _userStoreService = inject(UserStoreService);

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
        const portfolio = this._userStoreService.user()?.portfolio;
        this.structureTable.data = response.filter(fund => portfolio?.some(itemPortfolio => itemPortfolio.fundId !== fund.id));
        this.isLoadingTable.set(false);
      },
      error: (error) => {
        console.log(error);
        this.isLoadingTable.set(false);
      }
    });
  }

  actionEvent(event: { item: Fund, action: string }) {
    console.log(event);
  }
}
