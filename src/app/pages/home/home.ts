import { Component } from '@angular/core';
import { Button } from "primeng/button";

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  resetData() {
    localStorage.clear();
    location.reload();
  }
}
