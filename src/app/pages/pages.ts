import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularModule } from '@app/shared/modules';
import { Header } from "@app/shared/components/header/header";
import { Sidebar } from "@app/shared/components/sidebar/sidebar";
import { UserStoreService } from '@app/core/services/user-store.service';

@Component({
  selector: 'app-pages',
  imports: [AngularModule, RouterOutlet, Header, Sidebar],
  templateUrl: './pages.html',
  styleUrl: './pages.scss'
})
export class Pages {
  private _userStoreService = inject(UserStoreService);

  isCollapsedSignal = signal<boolean>(false);
  isHoveredSignal = signal<boolean>(false);

  ngOnInit() {
    this._userStoreService.setUser(JSON.parse(localStorage.getItem('currentUser')!));
  }

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}
