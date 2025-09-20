import { Component, inject, signal } from '@angular/core';
import { AngularModule } from '@app/shared/modules';
import { Table } from '@app/shared/components/table/table';
import { TableInterface } from '@app/core/interfaces/components.interface';
import { UserStoreService } from '@app/core/services/user-store.service';
import { PortfolioItem } from '@app/core/interfaces/db.mocks.interface';
import { FundsService } from '@app/core/services/funds.service';

// PrimeNG
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cancellation',
  imports: [AngularModule, Table, ToastModule, ConfirmDialog],
  templateUrl: './cancellation.html',
  styleUrl: './cancellation.scss',
  providers: [ConfirmationService, MessageService,]
})
export class Cancellation {
  private _confirmationService = inject(ConfirmationService);
  private _fundsService = inject(FundsService);
  private _messageService = inject(MessageService);
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

  confirm(event: any, options: any) {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      header: options.header,
      message: options.message,
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: options.rejectButtonProps.label,
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: options.acceptButtonProps.label,
      },
      accept: () => {
        options.accept();
      },
    });
  }

  actionEvent(event: { item: PortfolioItem, action: string }) {
    switch (event.action) {
      case 'cancellation':
        const options = {
          header: "Cancelar la suscripción",
          message: "Estas seguro de cancelar la suscripción?",
          acceptButtonProps: {
            label: "Sí, Cancelar",
          },
          rejectButtonProps: {
            label: "Cerrar",
          },
          accept: () => {
            this.cancelSubscription(event.item);
          },
        }
        this.confirm(event, options);
        break;
    }
  }

  cancelSubscription(portfolioItem: PortfolioItem) {
    const user = this._userStoreService.user();
    this._fundsService.cancelSubscription(portfolioItem).subscribe({
      next: () => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Se cancelo la suscripción al fondo. Enviaremos un mensaje a tu ${user?.notifications}.`,
          life: 5000,
        });
        this.getAllPortfolio();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
