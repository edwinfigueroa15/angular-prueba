import { Component, HostListener, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from '@app/core/services/user-store.service';
import { AngularModule } from '@app/shared/modules';

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  route?: string;
  badge?: number;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [AngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  private _router = inject(Router);
  private _userStoreService = inject(UserStoreService);

  toggleStates: { [key: number]: boolean } = {};
  isCollapsed = input<boolean>(false);
  isHovered = input<boolean>(false);

  eventChangeStatusSidebar = output<boolean>();
  eventChangeStatusHoverSidebar = output<boolean>();

  menuItems: MenuItem[] = [
    {
      key: 'home',
      label: 'Inicio',
      icon: 'pi pi-home',
      route: '/pages/home'
    },
    {
      key: 'fund-management',
      label: 'Gestión de fondos',
      icon: 'pi pi-wallet',
      children: [
        { key: 'subscription', label: 'Suscripción', icon: 'pi pi-plus', route: '/pages/fund-management/subscription' },
        { key: 'cancellation', label: 'Cancelación', icon: 'pi pi-user-minus', route: '/pages/fund-management/cancellation' }
      ]
    },
    {
      key: 'transaction-history',
      label: 'Historial de transacciones',
      icon: 'pi pi-chart-line',
      route: '/pages/transaction-history'
    },
  ];

  ngOnInit() {
    this.optionsPermited();
    this.showOptionCurrentMenu();
    this.ensureMobileCollapsed();
  }

  optionsPermited() {
    const permissions = this._userStoreService.user()?.role?.permissions;
    if(!permissions) {
      this.menuItems = [];
      return;
    }

    this.menuItems = this.menuItems.filter(item => {
      if (!item.children) return permissions?.includes(item.route!);

      item.children = item.children.filter(child => {
        return permissions?.includes(child.route!);
      });

      return item.children.length > 0 ? true : false;
    });
  }

  showOptionCurrentMenu() {
    this.menuItems.forEach((item, index) => {
      if (item.children) {
        item.children.forEach((child, childIndex) => {
          if (child.route === this._router.url) this.toggleStates[index] = true;
        });
      }

      if (item.route === this._router.url) this.toggleStates[index] = true;
    });
  }

  toggleSubmenu(index: number) {
    this.toggleStates[index] = !this.toggleStates[index];
  }

  toggleSidebar() {
    this.eventChangeStatusSidebar.emit(!this.isCollapsed());
  }

  onMouseEnter() {
    if (this.isCollapsed()) this.eventChangeStatusHoverSidebar.emit(true);
  }

  onMouseLeave() {
    if (this.isCollapsed()) this.eventChangeStatusHoverSidebar.emit(false);
  }

  onItemClicked() {
    try {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      if (isMobile) {
        this.eventChangeStatusSidebar.emit(true);
        this.eventChangeStatusHoverSidebar.emit(false);
      }
    } catch {}
  }

  private ensureMobileCollapsed() {
    try {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      if (isMobile && !this.isCollapsed()) {
        this.eventChangeStatusSidebar.emit(true);
        this.eventChangeStatusHoverSidebar.emit(false);
      }
    } catch {}
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.ensureMobileCollapsed();
  }
}
