import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Fund, Role, Transaction, User } from '@app/core/interfaces/db.mocks.interface';

@Injectable({
  providedIn: 'root'
})
export class MocksDbService {
  private _users: User[] = [];
  private _roles: Role[] = [];
  private _funds: Fund[] = [];
  private _transactions: Transaction[] = [];

  get users(): User[] {
    return this._users;
  }

  set users(value: User[]) {
    this._users = value;
    localStorage.setItem('db-users', JSON.stringify(value));
  }

  get roles(): Role[] {
    return this._roles;
  }

  set roles(value: Role[]) {
    this._roles = value;
    localStorage.setItem('db-roles', JSON.stringify(value));
  }

  get funds(): Fund[] {
    return this._funds;
  }

  set funds(value: Fund[]) {
    this._funds = value;
    localStorage.setItem('db-funds', JSON.stringify(value));
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  set transactions(value: Transaction[]) {
    this._transactions = value;
    localStorage.setItem('db-transactions', JSON.stringify(value));
  }

  private _http = inject(HttpClient);
  constructor() {}

  init() {
    this.loadUsers();
    this.loadRoles();
    this.loadFunds();
    this.loadTransactions();
  }

  loadUsers() {
    if (localStorage.getItem('db-users')) {
      this._users = JSON.parse(localStorage.getItem('db-users')!);
      return;
    }

    this._http.get<User[]>('/mocks/users.mock.json').subscribe(data => {
      this._users = data;
      localStorage.setItem('db-users', JSON.stringify(data));
    })
  }

  loadRoles() {
    if (localStorage.getItem('db-roles')) {
      this._roles = JSON.parse(localStorage.getItem('db-roles')!);
      return;
    }

    this._http.get<Role[]>('/mocks/roles.mock.json').subscribe(data => {
      this._roles = data;
      localStorage.setItem('db-roles', JSON.stringify(data));
    })
  }

  loadFunds() {
    if (localStorage.getItem('db-funds')) {
      this._funds = JSON.parse(localStorage.getItem('db-funds')!);
      return;
    }

    this._http.get<Fund[]>('/mocks/funds.mock.json').subscribe(data => {
      this._funds = data;
      localStorage.setItem('db-funds', JSON.stringify(data));
    })
  }

  loadTransactions() {
    if (localStorage.getItem('db-transactions')) {
      this._transactions = JSON.parse(localStorage.getItem('db-transactions')!);
      return;
    }

    this._http.get<Transaction[]>('/mocks/transactions.mock.json').subscribe(data => {
      this._transactions = data;
      localStorage.setItem('db-transactions', JSON.stringify(data));
    })
  }
}
