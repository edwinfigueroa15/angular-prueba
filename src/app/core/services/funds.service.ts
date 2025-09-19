import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FUNDS } from '@app/core/mocks/funds.mock';

@Injectable({
  providedIn: 'root'
})
export class FundsService {
  getAll() {
    return of(FUNDS);
  }
}
