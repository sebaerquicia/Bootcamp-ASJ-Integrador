import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-main',
  templateUrl: './my-main.component.html',
  styleUrl: './my-main.component.css'
})
export class MyMainComponent {
  constructor( private router: Router) { }

}
