import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { USERS } from '@app/core/mocks/users.mock';
import { UtilsService } from '@app/shared/utils/utils.service';
import { UserStoreService } from '@app/core/services/user-store.service';
import { ROLES } from '@app/core/mocks/roles.mock';
import { User } from '@app/core/interfaces/db.mocks.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userStoreService = inject(UserStoreService);
  private _utilsService = inject(UtilsService);

  getAll(): Observable<User[]> {
    const populateUser = USERS.map(user => {
      return {
        ...user,
        role: ROLES.find(role => role.id === user.roleId)!
      }
    });

    return of(populateUser);
  }
}
