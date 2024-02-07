import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Verificar si hay una sesión almacenada al cargar la aplicación
    const sessionData = localStorage.getItem('session');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      if (session.isAuthenticated) {
        // Si hay una sesión activa, establecer el estado de autenticación
        this.authService.setAuthenticated(session.isAuthenticated);
        this.authService.setUsername(session.username);
      } else {
        // Si no hay sesión activa, redirigir a la página de inicio de sesión
        this.router.navigate(['/login']);
      }
    } else {
      // Si no hay sesión almacenada, redirigir a la página de inicio de sesión
      this.router.navigate(['/login']);
    }
  }
}
