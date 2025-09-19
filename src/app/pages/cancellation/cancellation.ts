import { Component, inject, signal } from '@angular/core';
import { AngularModule } from '@app/shared/modules';
import { Table } from '@app/shared/components/table/table';
import { TableInterface } from '@app/core/interfaces/components.interface';
import { UserStoreService } from '@app/core/services/user-store.service';
import { PortfolioItem } from '@app/core/interfaces/db.mocks.interface';
import { FundsService } from '@app/core/services/funds.service';

@Component({
  selector: 'app-cancellation',
  imports: [AngularModule, Table],
  templateUrl: './cancellation.html',
  styleUrl: './cancellation.scss'
})
export class Cancellation {
  private _fundsService = inject(FundsService);
  private _userStoreService = inject(UserStoreService);

  isLoadingTable = signal<boolean>(true);
  structureTable: TableInterface = {
    data: [],
    structure: [
      { label: 'ID', sort: true, key: 'fundId' },
      { label: 'Monto', sort: true, key: 'amount', formatMoney: true },
      { label: 'Fecha de suscripción', sort: true, key: 'subscriptionDate', formatDate: true },
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
          { key: 'cancellation', icon: 'pi pi-times-circle', severity: 'danger', loading: false, disabled: false },
        ]
      }
    }
  }

  ngOnInit() {
    this.getAllPortfolio();
  }

  getAllPortfolio() {
    this.structureTable.data = this._userStoreService.user()?.portfolio || [];
    this.isLoadingTable.set(false);
  }

  actionEvent(event: { item: PortfolioItem, action: string }) {
    switch (event.action) {
      case 'cancellation':
        this.cancelSubscription(event.item);
        break;
    }
  }

  cancelSubscription(portfolioItem: PortfolioItem) {
    this._fundsService.cancelSubscription(portfolioItem).subscribe({
      next: () => {
        this.getAllPortfolio();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
