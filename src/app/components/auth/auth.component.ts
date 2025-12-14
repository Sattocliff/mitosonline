import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
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

  constructor(private authService: AuthService) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.message = 'Login correcto!';
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
