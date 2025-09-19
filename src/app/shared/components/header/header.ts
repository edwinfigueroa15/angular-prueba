import { Component, inject, input, output } from '@angular/core';
import { UserStoreService } from '@app/core/services/user-store.service';
import { AngularModule } from '@app/shared/modules';
import { Button } from "primeng/button";

@Component({
  selector: 'app-header',
  imports: [AngularModule, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private _userStoreService = inject(UserStoreService);

  currentUser = this._userStoreService.user;
  isCollapsed = input<boolean>(false);
  eventButtonMenu = output<boolean>();

  constructor() {}

  toggleSidebar() {
    this.eventButtonMenu.emit(!this.isCollapsed());
  }
}
