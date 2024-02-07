import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    // Validar las credenciales utilizando el servicio de autenticación
    if (this.authService.login(this.username, this.password)) {
      // Redirigir al usuario a la página principal si las credenciales son válidas
      this.router.navigate(['']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}
