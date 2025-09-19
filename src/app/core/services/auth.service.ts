import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { USERS } from '@app/core/mocks/users.mock';
import { UtilsService } from '@app/shared/utils/utils.service';
import { UserStoreService } from '@app/core/services/user-store.service';
import { ROLES } from '@app/core/mocks/roles.mock';
import { User } from '@app/core/interfaces/db.mocks.interface';

interface SignInBody {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userStoreService = inject(UserStoreService);
  private _utilsService = inject(UtilsService);

  signIn(body: SignInBody): Observable<User | null> {
    const currentUser = USERS.find(userItem => userItem.username === body.username && userItem.password === body.password);
    if (!currentUser) return of(null);
    const { password, ...userData } = currentUser;
    const populateUser = {
      ...userData,
      role: ROLES.find(role => role.id === currentUser.roleId)!
    };
    this._userStoreService.setUser(populateUser);
    return of(populateUser);
  }

  changePassword(email: string): Observable<User | null> {
    const currentUser = USERS.find(userItem => userItem.email === email);
    if (!currentUser) return of(null);
    const { password, ...userData } = currentUser;
    return of(userData);
  }

  signOut() {
    localStorage.removeItem('currentUser');
    this._userStoreService.clearUser();
    this._utilsService.routerLink('/auth/sign-in');
  }
}
