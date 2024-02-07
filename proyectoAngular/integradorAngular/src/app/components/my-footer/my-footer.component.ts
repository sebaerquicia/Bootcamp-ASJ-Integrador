import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-footer',
  templateUrl: './my-footer.component.html',
  styleUrl: './my-footer.component.css'
})
export class MyFooterComponent {
  constructor(private authService: AuthService, private route: Router){}
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
