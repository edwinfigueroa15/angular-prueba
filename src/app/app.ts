import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserStoreService } from '@app/core/services/user-store.service';
import { UtilsService } from '@app/shared/utils/utils.service';
import { MocksDbService } from '@app/core/services/mocks-db.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private _mocksDbService = inject(MocksDbService);
  private _userStoreService = inject(UserStoreService);
  private _utilsService = inject(UtilsService);

  ngOnInit() {
    this._mocksDbService.init();
    this.getUserAuth();
  }

  getUserAuth() {
    const user = localStorage.getItem('currentUser') || null;
    if (user) {
      const userAuth = JSON.parse(this._utilsService.decrypt(user));
      if(userAuth) this._userStoreService.setUser(userAuth);
    }
  }
}
