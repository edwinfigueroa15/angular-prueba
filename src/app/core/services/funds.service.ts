import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { UserStoreService } from '@app/core/services/user-store.service';
import { Fund, PortfolioItem, User } from '@app/core/interfaces/db.mocks.interface';
import { MocksDbService } from '@app/core/services/mocks-db.service';
import { TransactionsService } from '@app/core/services/transactions.service';
import { UtilsService } from '@app/shared/utils/utils.service';
@Injectable({
  providedIn: 'root'
})
export class FundsService {
  private _mocksDbService = inject(MocksDbService);
  private _transactionsService = inject(TransactionsService);
  private _userStoreService = inject(UserStoreService);
  private _utilsService = inject(UtilsService);

  getAll() {
    return of(this._mocksDbService.funds);
  }

  createSubscription(fund: Fund) {
    const currentUser = this._userStoreService.user();
    const newUser: User = {
      ...currentUser!,
      portfolio: [...currentUser?.portfolio!, { fundId: fund.id, amount: fund.minimum, subscriptionDate: new Date().toISOString() }],
      balance: currentUser?.balance! - fund.minimum!
    }

    this._mocksDbService.users = this._mocksDbService.users.map(user => user.id === currentUser?.id ? newUser : user);
    this._userStoreService.setUser(newUser);
    this._transactionsService.create({
      id: this._utilsService.generateId(),
      userId: currentUser?.id!,
      amount: fund.minimum!,
      type: 'opening',
      fundId: fund.id,
      date: new Date().toISOString(),
      user: currentUser!,
      fund: fund!
    });
    return of(true);
  }

  cancelSubscription(portfolioItem: PortfolioItem) {
    const currentUser = this._userStoreService.user();
    const portfolio = currentUser?.portfolio?.filter(fund => fund.fundId !== portfolioItem.fundId);
    const newUser: User = {
      ...currentUser!,
      portfolio: portfolio!,
      balance: currentUser?.balance! + portfolioItem.amount!
    }

    this._mocksDbService.users = this._mocksDbService.users.map(user => user.id === currentUser?.id ? newUser : user);
    this._userStoreService.setUser(newUser);
    this._transactionsService.create({
      id: this._utilsService.generateId(),
      userId: currentUser?.id!,
      amount: portfolioItem.amount!,
      type: 'cancellation',
      fundId: portfolioItem.fundId,
      date: new Date().toISOString(),
      user: currentUser!,
      fund: this._mocksDbService.funds.find(fund => fund.id === portfolioItem.fundId)!
    });
    return of(true);
  }
}
