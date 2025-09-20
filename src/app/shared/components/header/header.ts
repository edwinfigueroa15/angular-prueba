import { Component, inject, input, output } from '@angular/core';
import { UserStoreService } from '@app/core/services/user-store.service';
import { AngularModule } from '@app/shared/modules';
import { Button } from "primeng/button";
import { MenuModule } from 'primeng/menu';
import { AuthService } from '@app/core/services/auth.service';
import { UtilsService } from '@app/shared/utils/utils.service';

@Component({
  selector: 'app-header',
  imports: [AngularModule, Button, MenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private _authService = inject(AuthService);
  private _userStoreService = inject(UserStoreService);
  private _utilsService = inject(UtilsService);

  items = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => {
        this._utilsService.routerLink('/pages/profile');
      }
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => {
        this._authService.signOut();
      }
    }
  ];

  currentUser = this._userStoreService.user;
  isCollapsed = input<boolean>(false);
  eventButtonMenu = output<boolean>();

  constructor() { }

  toggleSidebar() {
    this.eventButtonMenu.emit(!this.isCollapsed());
  }
}
