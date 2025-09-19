import { inject, Injectable } from '@angular/core';
import { Transaction } from '@app/core/interfaces/db.mocks.interface';
import { MocksDbService } from '@app/core/services/mocks-db.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private _mocksDbService = inject(MocksDbService);

  getAll() {
    const populateTransactions = this._mocksDbService.transactions.map(transaction => {
      return {
        ...transaction,
        user: this._mocksDbService.users.find(user => user.id === transaction.userId)!,
        fund: this._mocksDbService.funds.find(fund => fund.id === transaction.fundId)!,
      }
    });

    return of(populateTransactions);
  }

  create(transaction: Transaction) {
    this._mocksDbService.transactions = [...this._mocksDbService.transactions, transaction];
    return of(true);
  }

  delete(transactionId: string) {
    this._mocksDbService.transactions = this._mocksDbService.transactions.filter(transaction => transaction.id !== transactionId);
    return of(true);
  }
}
