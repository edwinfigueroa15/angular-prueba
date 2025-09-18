import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularModule } from '@app/shared/modules';
import { Header } from "@app/shared/components/header/header";
import { Sidebar } from "@app/shared/components/sidebar/sidebar";

@Component({
  selector: 'app-pages',
  imports: [AngularModule, RouterOutlet, Header, Sidebar],
  templateUrl: './pages.html',
  styleUrl: './pages.scss'
})
export class Pages {
  isCollapsedSignal = signal<boolean>(false);
  isHoveredSignal = signal<boolean>(false);

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}
