import { Component, input, output } from '@angular/core';
import { AngularModule } from '@app/shared/modules';
import { Button } from "primeng/button";

@Component({
  selector: 'app-header',
  imports: [AngularModule, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isCollapsed = input<boolean>(false);
  eventButtonMenu = output<boolean>();

  constructor() {}

  toggleSidebar() {
    this.eventButtonMenu.emit(!this.isCollapsed());
  }
}
