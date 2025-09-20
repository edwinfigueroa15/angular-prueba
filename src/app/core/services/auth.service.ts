import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UtilsService } from '@app/shared/utils/utils.service';
import { UserStoreService } from '@app/core/services/user-store.service';
import { User } from '@app/core/interfaces/db.mocks.interface';
import { MocksDbService } from '@app/core/services/mocks-db.service';

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
  private _mocksDbService = inject(MocksDbService);

  signIn(body: SignInBody): Observable<User | null> {
    const currentUser = this._mocksDbService.users.find(userItem => userItem.username === body.username && userItem.password === body.password);
    if (!currentUser) return of(null);

    const populateUser = {
      ...currentUser,
      role: this._mocksDbService.roles.find(role => role.id === currentUser.roleId)!
    };

    this._userStoreService.setUser(populateUser);
    return of(populateUser);
  }

  changePassword(email: string): Observable<User | null> {
    const currentUser = this._mocksDbService.users.find(userItem => userItem.email === email);
    if (!currentUser) return of(null);
    return of(currentUser);
  }

  signOut() {
    localStorage.removeItem('currentUser');
    this._userStoreService.clearUser();
    this._utilsService.routerLink('/auth/sign-in');
  }
}
