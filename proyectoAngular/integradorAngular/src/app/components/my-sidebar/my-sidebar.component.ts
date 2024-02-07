import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-sidebar',
  templateUrl: './my-sidebar.component.html',
  styleUrls: ['./my-sidebar.component.css']
})
export class MySidebarComponent {
  constructor(private authService: AuthService, private router: Router) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getUsername(): string {
    return this.authService.getUsername();
  }

  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres salir de la aplicación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
