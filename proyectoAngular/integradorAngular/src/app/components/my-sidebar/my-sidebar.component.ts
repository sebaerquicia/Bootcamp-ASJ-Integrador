import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-sidebar',
  templateUrl: './my-sidebar.component.html',
  styleUrl: './my-sidebar.component.css'
})
export class MySidebarComponent {
  constructor(private router: Router) { }
}
