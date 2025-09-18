import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { USERS } from '@app/core/mocks/users.mock';
import { UtilsService } from '@app/shared/utils/utils.service';
import { UserStoreService } from '@app/core/services/user-store.service';

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

  signIn(body: SignInBody) {
    const currentUser = USERS.find(userItem => userItem.username === body.username && userItem.password === body.password);
    return of(currentUser);
  }

  changePassword(email: string) {
    console.log(email);
    const currentUser = USERS.find(userItem => userItem.email === email);
    return of(currentUser);
  }

  signOut() {
    localStorage.removeItem('currentUser');
    this._userStoreService.clearUser();
    this._utilsService.routerLink('/auth/sign-in');
  }
}
