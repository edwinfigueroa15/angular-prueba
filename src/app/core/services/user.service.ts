import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '@app/core/interfaces/db.mocks.interface';
import { MocksDbService } from '@app/core/services/mocks-db.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _mocksDbService = inject(MocksDbService);

  getAll(): Observable<User[]> {
    const populateUser = this._mocksDbService.users.map(user => {
      return {
        ...user,
        role: this._mocksDbService.roles.find(role => role.id === user.roleId)!
      }
    });

    return of(populateUser);
  }
}
