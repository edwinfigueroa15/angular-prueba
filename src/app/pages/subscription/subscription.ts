import { Component, inject, signal } from '@angular/core';
import { AngularModule } from '@app/shared/modules';
import { Table } from '@app/shared/components/table/table';
import { TableInterface } from '@app/core/interfaces/components.interface';
import { FundsService } from '@app/core/services/funds.service';
import { UserStoreService } from '@app/core/services/user-store.service';
import { Fund } from '@app/core/interfaces/db.mocks.interface';

// PrimeNG
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-subscription',
  imports: [AngularModule, Table, ToastModule, ConfirmDialog],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss',
  providers: [ConfirmationService, MessageService]
})
export class Subscription {
  private _confirmationService = inject(ConfirmationService);
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

  actionEvent(event: { item: Fund, action: string }) {
    switch (event.action) {
      case 'linkage':
        const options = {
          header: "Vincularse al fondo",
          message: "Estas seguro de vincularse al fondo?",
          acceptButtonProps: {
            label: "Sí, Vincularse",
          },
          rejectButtonProps: {
            label: "Cerrar",
          },
          accept: () => {
            this.linkage(event.item);
          },
        }
        this.confirm(event, options);
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
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Se vinculo al fondo ${fund.name}. Enviaremos un mensaje a tu ${user?.notifications}.`,
          life: 5000,
        });
        this.getAllFunds();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
