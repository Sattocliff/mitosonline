import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router:Router) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.message = 'Login correcto!';
      this.router.navigate(['/deck-builder']);
    } catch (err: any) {
      this.message = err.message;
    }
  }

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.message = 'Cuenta creada!';
    } catch (err: any) {
      this.message = err.message;
    }
  }
}
