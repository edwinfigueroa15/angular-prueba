import { Component, inject, signal } from '@angular/core';
import { AngularModule } from '@app/shared/modules';
import { Table } from '@app/shared/components/table/table';
import { TableInterface } from '@app/core/interfaces/components.interface';
import { TransactionsService } from '@app/core/services/transactions.service';
import { UserStoreService } from '@app/core/services/user-store.service';
import { User } from '@app/core/interfaces/db.mocks.interface';
import { InputSelect } from '@app/shared/components/inputs/input-select/input-select';
import { UserService } from '@app/core/services/user.service';

// PrimeNG
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transaction-history',
  imports: [AngularModule, Table, Toast, InputSelect],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.scss',
  providers: [MessageService]
})
export class TransactionHistory {
  private _messageService = inject(MessageService);
  private _transactionsService = inject(TransactionsService);
  private _userService = inject(UserService);
  private _userStoreService = inject(UserStoreService);

  userControl = new FormControl<number | null>(null);
  isAdmin = signal<boolean>(false);

  listUsers: User[] = [];
  isLoadingTable = signal<boolean>(true);
  structureTable: TableInterface = {
    data: [],
    structure: [
      { label: 'Tipo', sort: true, key: 'type' },
      { label: 'Fondo', sort: true, key: 'fund.name' },
      { label: 'Monto', sort: true, key: 'amount', formatMoney: true },
      { label: 'Fecha', sort: true, key: 'date', formatDate: true },
    ],
    options: {
      paginator: {
        show: true,
        rows: 5,
        perPage: [5, 10, 20]
      },
      actions: {
        show: false
      }
    }
  }

  ngOnInit() {
    this._buildViewByRole();
    this.getAllUsers();
  }

  private _buildViewByRole() {
    this.isAdmin.set(this._userStoreService.user()?.role?.name === 'admin');
    this.userControl.setValue(this._userStoreService.user()?.id!);
    this.getTransactionsByUser();
  }

  getAllUsers() {
    this._userService.getAll().subscribe({
      next: (response) => {
        this.listUsers = response;  
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getTransactionsByUser() {
    this._transactionsService.getByUser(this.userControl.value!).subscribe({
      next: (response) => {
        this.structureTable.data = response;
        this.isLoadingTable.set(false);
      },
      error: (error) => {
        console.log(error);
        this.isLoadingTable.set(false);
      }
    });
  }

  onUserChange(event: any) {
    this.getTransactionsByUser();
  }
}
