import { Component, input, output } from '@angular/core';
import { AngularModule } from '@app/shared/modules';

interface MenuItem {
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
  toggleStates: { [key: number]: boolean } = {};
  isCollapsed = input<boolean>(false);
  isHovered = input<boolean>(false);

  eventChangeStatusSidebar = output<boolean>();
  eventChangeStatusHoverSidebar = output<boolean>();

  openIndex: number | null = null;
  menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      route: '/pages/home'
    },
    {
      label: 'Gestión de fondos',
      icon: 'pi pi-wallet',
      children: [
        { label: 'Suscripción', icon: 'pi pi-plus', route: '/pages/fund-management/subscription' },
        { label: 'Cancelación', icon: 'pi pi-user-minus', route: '/pages/fund-management/cancellation' }
      ]
    },
    {
      label: 'Historial de transacciones',
      icon: 'pi pi-chart-line',
      route: '/pages/transaction-history'
    },
  ];

  toggleSubmenu(index: number) {
    this.toggleStates[index] = !this.toggleStates[index];
  }

  toggleSidebar() {
    this.eventChangeStatusSidebar.emit(!this.isCollapsed);
  }

  onMouseEnter() {
    if (this.isCollapsed()) this.eventChangeStatusHoverSidebar.emit(true);
  }

  onMouseLeave() {
    if (this.isCollapsed()) this.eventChangeStatusHoverSidebar.emit(false);
  }
}
